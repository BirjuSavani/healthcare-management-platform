import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ERROR_MESSAGE, GLOBAL_MESSAGE, SUCCESS_MESSAGE } from '../../../constant/message';
import { ICustomRequest } from '../../../middleware/authMiddleware';
import { ResponseHandler } from '../../../utils/helper';
import { IApiResponse } from '../../../utils/helper/interface/responseInterface';
import { logger } from '../../../utils/logger';
import adminService from './adminService';
import { IUpdateUserPayload, UpdateUserResponse, UserListResponse, UserResponse } from './interface/adminInterface';

class AdminController {
  /**
   * Get all users
   * @param req
   * @param res
   * @returns UserListResponse
   */
  async getAllUsers(req: Request, res: Response): UserListResponse {
    try {
      // Fetch all users
      const users = await adminService.getAllUsers(req);

      if (!users) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.NO_USERS_FOUND, '');
        return ResponseHandler.error(res, httpStatus.OK, false, ERROR_MESSAGE.NO_USERS_FOUND, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.GET_ALL_USERS, '');

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_ALL_USERS, users);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_ALL_USERS, error);
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }

  /**
   * Get By Id user
   * @param req
   * @param res
   * @returns UserResponse
   */
  async getUserById(req: Request, res: Response): UserResponse {
    const userId = req.params.id;
    try {
      // Fetch the user by ID
      const user = await adminService.getUserById(userId);

      if (!user) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.USER_NOT_FOUND, { userId });
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.USER_NOT_FOUND, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.GET_USER_BY_ID, { userId });

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.GET_USER_BY_ID, user);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.GET_USER_BY_ID, { userId, error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }

  /**
   * Update user
   * @param req
   * @param res
   * @returns UpdateUserResponse
   */
  async updateUser(req: Request, res: Response): UpdateUserResponse {
    const { userId } = req as ICustomRequest;
    const updateUserId = req.params.id;
    try {
      const payload: IUpdateUserPayload = req.body;

      // Fetch the user by ID
      const user = await adminService.getUserById(updateUserId);

      if (!user) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.USER_NOT_FOUND, { updateUserId });
        return ResponseHandler.error(res, httpStatus.BAD_REQUEST, false, ERROR_MESSAGE.USER_NOT_FOUND, ERROR_MESSAGE.USER_NOT_FOUND);
      }

      // Update the user
      const updatedUser = await adminService.updateUser(updateUserId, payload, userId);

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.UPDATE_USER, { updateUserId });

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.UPDATE_USER, updatedUser);
    } catch (error) {
      // Log the error with request details
      logger.error(__filename, req.method, '', ERROR_MESSAGE.UPDATE_USER, { updateUserId, error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }

  /**
   * Delete user by ID
   * @param req
   * @param res
   * @returns
   */
  async deleteUser(req: Request, res: Response): Promise<IApiResponse> {
    const userId = req.params.id;
    try {
      // Delete the user by ID
      const deletedUser = await adminService.deleteUser(userId);

      if (!deletedUser) {
        logger.warn(__filename, req.method, '', ERROR_MESSAGE.USER_NOT_FOUND, { userId });
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.USER_NOT_FOUND, null);
      }

      logger.info(__filename, req.method, '', SUCCESS_MESSAGE.DELETE_USER, { userId });

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.DELETE_USER, null);
    } catch (error) {
      logger.error(__filename, req.method, '', ERROR_MESSAGE.DELETE_USER, { userId, error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    }
  }
}

export default new AdminController();
