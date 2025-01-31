import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ERROR_MESSAGE, GLOBAL_MESSAGE, SUCCESS_MESSAGE } from '../../../constant/message';
import { CustomRequest } from '../../../middleware/authMiddleware';
import { ResponseHandler } from '../../../utils/helper';
import { logger } from '../../../utils/logger';
import authService from '../../Auth/authService';
import { IUpdateUserPayload, UserProfileResponse } from './interface/userInterface';
import userService from './userService';

class UserController {
  async getUserProfile(req: Request, res: Response): UserProfileResponse {
    try {
      const { userId } = req as CustomRequest;
      const user = await authService.findById(userId);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.GET_USER_PROFILE, '');

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_USER_PROFILE, user);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_USER_PROFILE, error);
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }

  /**
   * Update user profile
   * @param req Request object
   * @param res Response object
   */
  async updateUserProfile(req: Request, res: Response): UserProfileResponse {
    const { userId } = req as CustomRequest;

    try {
      const payload: IUpdateUserPayload = req.body;

      // Fetch the user by ID
      const existingUser = await authService.findById(userId);

      if (!existingUser) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.USER_NOT_FOUND, { userId });
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.USER_NOT_FOUND, null);
      }

      // Update the user
      const updatedUser = await userService.updateUserProfile(userId, payload);

      if (!updatedUser) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.UPDATE_USER_PROFILE, { userId });
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.UPDATE_USER_PROFILE, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.UPDATE_USER_PROFILE, { userId });

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.UPDATE_USER_PROFILE, updatedUser);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.UPDATE_USER_PROFILE, { userId, error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }
}

export default new UserController();
