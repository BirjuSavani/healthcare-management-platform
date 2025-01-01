import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constant/message';
import { CustomRequest } from '../../middleware/authMiddleware';
import { comparePassword, convertPlainTextToHash, generateToken } from '../../utils/commonUtils';
import { ResponseHandler } from '../../utils/helper';
import { IApiResponse } from '../../utils/helper/interface/responseInterface';
import { logger } from '../../utils/logger';
import AuthService from './authService';
import { IAuthPayload, ILoginPayload, IUserData } from './interface/authInterface';

class AuthController {
  /**
   * Handles user signup by superadmin.
   * Validates the payload, checks for existing user or phone number, and creates a new user.
   */
  async signup(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const { userId } = req as CustomRequest;
      const payload: IAuthPayload = req.body;

      // Check if email already exists or phone number already exists
      const [existingUser, existingPhoneNumber] = await Promise.all([
        AuthService.findByEmail(payload.email),
        AuthService.findByPhoneNumber(payload.phone_number),
      ]);

      if (existingUser) {
        return ResponseHandler.error(
          res,
          httpStatus.CONFLICT,
          false,
          ERROR_MESSAGE.EMAIL_ALREADY_EXISTS,
          `${ERROR_MESSAGE.EMAIL_ALREADY_EXISTS} ${payload.email}`
        );
      }

      if (existingPhoneNumber) {
        return ResponseHandler.error(
          res,
          httpStatus.CONFLICT,
          false,
          ERROR_MESSAGE.PHONE_NUMBER_ALREADY_EXISTS,
          `${ERROR_MESSAGE.PHONE_NUMBER_ALREADY_EXISTS} ${payload.phone_number}`
        );
      }

      // Hash password and create user
      const hashPassword = await convertPlainTextToHash(payload.password);

      let authData = await AuthService.signup(payload, hashPassword, userId);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.SIGNUP, { userEmail: payload.email });

      return ResponseHandler.success(res, httpStatus.CREATED, true, SUCCESS_MESSAGE.SIGNUP, authData);
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SIGNUP, { error: error.message || error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, ERROR_MESSAGE.SIGNUP, error);
    }
  }

  /**
   * Handles user login.
   * Validates credentials, generates a token, and returns user data.
   */
  async login(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const payload: ILoginPayload = req.body;

      // Fetch user by email
      const authData: IUserData | null = await AuthService.findByEmail(payload.email);

      if (!authData) {
        return ResponseHandler.error(res, httpStatus.UNAUTHORIZED, false, ERROR_MESSAGE.USER_NOT_FOUND);
      }

      // Verify password
      const isMatch = await comparePassword(payload.password, authData.password);

      if (!isMatch) {
        return ResponseHandler.error(
          res,
          httpStatus.UNAUTHORIZED,
          false,
          ERROR_MESSAGE.INVALID_CREDENTIALS,
          ERROR_MESSAGE.INVALID_CREDENTIALS
        );
      }

      // Generate JWT token
      const token = generateToken(authData.user_id, authData.role);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.LOGIN, { userId: authData.user_id });

      return ResponseHandler.success(
        res,
        httpStatus.OK,
        true,
        SUCCESS_MESSAGE.LOGIN,
        { token, user: { ...authData, password: undefined } } // Exclude password from response
      );
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.LOGIN, { error: error.message || error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, ERROR_MESSAGE.LOGIN, error);
    }
  }
}

export default new AuthController();
