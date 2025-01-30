import { ERROR_MESSAGE } from '../../../constant/message';
import { UserMaster } from '../../../database/models';
import { logger } from '../../../utils/logger';
import { IUpdateUserPayload } from './interface/userInterface';

class UserService {
  /**
   * Update user profile
   * @param userId User ID
   * @param payload User data
   */
  async updateUserProfile(userId: string, payload: IUpdateUserPayload): Promise<any> {
    try {
      const [updatedCount, updatedRows] = await UserMaster.update(
        { ...payload, last_modified_by: userId, updated_at: new Date() },
        { where: { user_id: userId }, returning: true }
      );

      if (updatedCount === 0) {
        logger.warn(__filename, '', '', ERROR_MESSAGE.USER_NOT_FOUND, { userId });
        return null;
      }

      return updatedRows[0].get({ plain: true });
    } catch (error) {
      logger.error(__filename, '', '', ERROR_MESSAGE.UPDATE_USER_PROFILE, { userId, error });
      throw new Error(`${ERROR_MESSAGE.UPDATE_USER_PROFILE}: ${error}`);
    }
  }
}

export default new UserService();
