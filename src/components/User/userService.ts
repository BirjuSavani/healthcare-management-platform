import { Request } from 'express';
import { Op } from 'sequelize';
import { ERROR_MESSAGE } from '../../constant/message';
import { UserMaster } from '../../database/models';
import { paginate } from '../../utils/helper/paginationHelper';
import { logger } from '../../utils/logger';
import { IRole } from '../Auth/interface/authInterface';
class UserService {
  /**
   * Get all users
   * @returns
   */
  async getAllUsers(req: Request) {
    try {
      const { filter, page = req.query.page || 1, limit = req.query.limit || 10 } = req.query;
      const whereClause: any = {
        isDeleted: false,
        role: {
          [Op.ne]: IRole.SUPER_ADMIN,
        },
      };
      if (filter) {
        whereClause[Op.or] = [
          { first_name: { [Op.like]: `%${filter}%` } },
          { last_name: { [Op.like]: `%${filter}%` } },
          { email: { [Op.like]: `%${filter}%` } },
          { role: { [Op.like]: `%${filter}%` } },
        ];
      }

      const user = await UserMaster.findAndCountAll({
        where: whereClause,
        attributes: { exclude: ['password'] },
        order: [['created_at', 'DESC']],
        offset: (Number(page) - 1) * Number(limit),
        limit: Number(limit),
      });

      return paginate(user.count, user.rows, { page: Number(page), limit: Number(limit) });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.GET_ALL_USERS, error);
      throw new Error(`${ERROR_MESSAGE.GET_ALL_USERS}: ${error}`);
    }
  }
}

export default new UserService();
