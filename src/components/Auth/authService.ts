import { ERROR_MESSAGE } from '../../constant/message';
import { UserMaster } from '../../database/models';
import { logger } from '../../utils/logger';
import { IAuthPayload, IRole, IUserData } from './interface/authInterface';

class AuthService {
  /**
   * General method to find a user by a given condition.
   * @param condition - The query condition.
   * @returns The user data or null if not found.
   */
  private async findUser(condition: object): Promise<IUserData | null> {
    try {
      const user = await UserMaster.findOne(condition);

      // Use `.get()` to extract the raw object, and cast it to `IUserData`.
      return user ? (user.get({ plain: true }) as IUserData) : null;
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_USER_FAILURE, { condition, error });
      throw new Error(`${ERROR_MESSAGE.FIND_USER_FAILURE}: ${error}`);
    }
  }

  /**
   * Find a user by email.
   * @param email - The user's email address.
   * @returns The user data or null if not found.
   */
  async findByEmail(email: string): Promise<IUserData | null> {
    try {
      return await this.findUser({ where: { email } });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.FIND_BY_EMAIL_FAILURE}: ${error}`);
    }
  }

  /**
   * Find a user by phone number.
   * @param phone_number - The user's phone number.
   * @returns The user data or null if not found.
   */
  async findByPhoneNumber(phone_number: string): Promise<IUserData | null> {
    try {
      return await this.findUser({ where: { phone_number } });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_BY_PHONE_NUMBER_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.FIND_BY_PHONE_NUMBER_FAILURE}: ${error}`);
    }
  }

  /**
   * Find a user by ID.
   * @param id - The user's ID.
   * @returns The user data or null if not found.
   */
  async findById(id: string): Promise<IUserData | null> {
    try {
      return await this.findUser({ where: { user_id: id } });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FIND_USER_FAILURE, '');
      throw new Error(`${ERROR_MESSAGE.FIND_USER_FAILURE}: ${error}`);
    }
  }

  /**
   * Create a new user.
   * @param payload - The user data payload.
   * @param hashPassword - The hashed password.
   * @returns The created user data.
   */
  async signup(payload: IAuthPayload, hashPassword: string, userId?: string): Promise<IUserData> {
    try {
      // Check if the user is an end user
      const isEndUser = userId === undefined;

      // Create the user
      const user = await UserMaster.create({
        ...payload,
        password: hashPassword,
        role: isEndUser ? IRole.END_USER : payload.role,
        isActive: true,
        isDeleted: false,
        created_by: userId ?? null,
        last_modified_by: userId ?? null,
      });

      // Get the user data
      const userData = user.get({ plain: true }) as IUserData;

      // Update the `created_by` and `last_modified_by` fields
      if (isEndUser && userData.created_by === null && userData.last_modified_by === null) {
        return await this.updateCreateBy(userData.user_id);
      }

      return userData;
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SIGNUP_FAILURE, { payload, error });
      throw new Error(`${ERROR_MESSAGE.SIGNUP_FAILURE}: ${error}`);
    }
  }

  /**
   * Update the `created_by` and `last_modified_by` fields for a user.
   * @param userId - The user ID to update.
   * @returns The updated user data.
   */
  private async updateCreateBy(userId: string) {
    try {
      // Update the `created_by` and `last_modified_by` fields
      const user = await UserMaster.update(
        { created_by: userId, last_modified_by: userId },
        {
          where: {
            user_id: userId,
          },
          returning: true,
        }
      );
      return user[1][0].get({ plain: true }) as IUserData;
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE, { userId, error });
      throw new Error(`${ERROR_MESSAGE.UPDATE_CREATE_BY_FAILURE}: ${error}`);
    }
  }
}

export default new AuthService();
