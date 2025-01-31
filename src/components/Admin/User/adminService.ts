import { Request } from 'express';
import { Op } from 'sequelize';
import { ERROR_MESSAGE } from '../../../constant/message';
import { UserMaster } from '../../../database/models';
import { convertPlainTextToHash } from '../../../utils/commonUtils';
import { paginate } from '../../../utils/helper/paginationHelper';
import { logger } from '../../../utils/logger';
import { IRole, IUserData } from '../../Auth/interface/authInterface';
import { IUser } from '../../User/Profile/interface/userInterface';
import { IUpdateUserPayload } from './interface/adminInterface';

class AdminService {
  /**
   * Get all users
   * @returns Promise<IUserData[]>
   */
  async getAllUsers(req: Request) {
    try {
      const { filter, page = req.query.page || 1, limit = req.query.limit || 10 } = req.query;

      // Build where clause
      const whereClause: any = {
        isDeleted: false,
        role: {
          [Op.ne]: IRole.SUPER_ADMIN
        }
      };

      // Apply filter
      if (filter) {
        whereClause[Op.or] = [
          { first_name: { [Op.like]: `%${filter}%` } },
          { last_name: { [Op.like]: `%${filter}%` } },
          { email: { [Op.like]: `%${filter}%` } },
          { role: { [Op.like]: `%${filter}%` } }
        ];
      }

      // Fetch users with pagination
      const user = await UserMaster.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['password'] },
        include: [
          { model: UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
          { model: UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
        ],
        order: [['created_at', 'DESC']],
        offset: (Number(page) - 1) * Number(limit),
        limit: Number(limit)
      });

      return paginate(user.count, user.rows, { page: Number(page), limit: Number(limit) });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.GET_ALL_USERS, error);
      throw new Error(`${ERROR_MESSAGE.GET_ALL_USERS}: ${error}`);
    }
  }

  /**
   * Get user by id
   * @param userId - ID of the user to retrieve
   * @returns Promise<IUser | null>
   */
  async getUserById(userId: string): Promise<IUser | null> {
    try {
      const user = await UserMaster.findByPk(userId, {
        attributes: { exclude: ['password'] },
        include: [
          { model: UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
          { model: UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
        ]
      });
      return user ? (user.get({ plain: true }) as IUser) : null;
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.GET_USER_BY_ID, { userId, error });
      throw new Error(`${ERROR_MESSAGE.GET_USER_BY_ID}: ${error}`);
    }
  }

  /**
   * Update user by ID
   * @param userId - ID of the user to update
   * @param payload - Data to update the user
   * @returns Promise<IUserData>
   */
  async updateUser(updateUserId: string, payload: IUpdateUserPayload, userId: string): Promise<IUserData> {
    try {
      const hasPassword = await convertPlainTextToHash(payload.password);

      const [updateCount, updatedUsers] = await UserMaster.update(
        { ...payload, password: hasPassword, last_modified_by: userId, updated_at: new Date() },
        {
          where: { user_id: updateUserId },
          returning: true
        }
      );

      if (updateCount === 0 || !updatedUsers[0]) {
        logger.warn(__filename, '', '', ERROR_MESSAGE.USER_NOT_FOUND, { updateUserId });
        throw new Error(`${ERROR_MESSAGE.USER_NOT_FOUND} : ${updateUserId}`);
      }

      return updatedUsers[0].get({ plain: true }) as IUserData;
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.UPDATE_USER, { updateUserId, error });
      throw new Error(`${ERROR_MESSAGE.UPDATE_USER}: ${error}`);
    }
  }

  /**
   * Delete user by ID
   * @param userId - ID of the user to delete
   * @returns Promise<IUserData>
   */
  async deleteUser(userId: string): Promise<IUserData> {
    try {
      // Find the user by primary key
      const user = await UserMaster.findByPk(userId);

      if (!user) {
        logger.warn(__filename, '', '', ERROR_MESSAGE.USER_NOT_FOUND, { userId });
        throw new Error(`${ERROR_MESSAGE.USER_NOT_FOUND} : ${userId}`);
      }

      // Mark user as deleted and save changes
      await user.update({ isDeleted: true, isActive: false });

      return user.get({ plain: true }) as IUserData;
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.DELETE_USER, { userId, error });
      throw new Error(`${ERROR_MESSAGE.DELETE_USER}: ${error}`);
    }
  }
}

export default new AdminService();
