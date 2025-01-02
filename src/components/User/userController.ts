import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ERROR_MESSAGE, GLOBAL_MESSAGE, SUCCESS_MESSAGE } from '../../constant/message';
import { CustomRequest } from '../../middleware/authMiddleware';
import { ResponseHandler } from '../../utils/helper';
import { logger } from '../../utils/logger';
import authService from '../Auth/authService';
import { UserListResponse, UserProfileResponse } from './interface/userInterface';
import userService from './userService';

class UserController {
  async getAllUsers(req: Request, res: Response): UserListResponse {
    try {
      const users = await userService.getAllUsers(req);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.GET_ALL_USERS, '');

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_ALL_USERS, users);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_ALL_USERS, error);
      return ResponseHandler.error(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        false,
        GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }

  async getUserProfile(req: Request, res: Response): UserProfileResponse {
    try {
      const { userId } = req as CustomRequest;
      const user = await authService.findById(userId);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.GET_USER_PROFILE, '');

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_USER_PROFILE, user);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_USER_PROFILE, error);
      return ResponseHandler.error(
        res,
        httpStatus.INTERNAL_SERVER_ERROR,
        false,
        GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}

export default new UserController();
