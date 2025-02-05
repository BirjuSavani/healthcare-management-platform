import crypto from 'crypto';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '../../constant/message';
import { ICustomRequest } from '../../middleware/authMiddleware';
import { comparePassword, convertPlainTextToHash, generateToken } from '../../utils/commonUtils';
import { ResponseHandler } from '../../utils/helper';
import { IApiResponse } from '../../utils/helper/interface/responseInterface';
import { logger } from '../../utils/logger';
import AuthService from './authService';
import { AuthResponse, IAuthPayload, IDoctorPayload, ILoginPayload, IUserData, LoginResponse } from './interface/authInterface';

class AuthController {
  /**
   * Handles user signup by superadmin.
   * Validates the payload, checks for existing user or phone number, and creates a new user.
   */
  async signup(req: Request, res: Response): AuthResponse {
    try {
      const { userId } = req as ICustomRequest;
      const payload: IAuthPayload = req.body;

      // Check if email already exists or phone number already exists
      const [existingUser, existingPhoneNumber] = await Promise.all([AuthService.findByEmail(payload.email), AuthService.findByPhoneNumber(payload.phone_number)]);

      if (existingUser) {
        return ResponseHandler.error(res, httpStatus.CONFLICT, false, ERROR_MESSAGE.EMAIL_ALREADY_EXISTS, `${ERROR_MESSAGE.EMAIL_ALREADY_EXISTS} ${payload.email}`);
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

      const authData = await AuthService.signup(payload, hashPassword, userId);

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
  async login(req: Request, res: Response): LoginResponse {
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
        return ResponseHandler.error(res, httpStatus.UNAUTHORIZED, false, ERROR_MESSAGE.INVALID_CREDENTIALS, ERROR_MESSAGE.INVALID_CREDENTIALS);
      }

      // Generate JWT token
      const token = generateToken(authData.user_id, authData.role);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.LOGIN, { userId: authData.user_id });

      const authResponse = {
        token,
        user: { ...authData, password: undefined } // Exclude password from response
      };

      void AuthService.sendWelcomeEmailWithTemplate(authData);

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.LOGIN, authResponse);
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.LOGIN, { error: error.message || error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, ERROR_MESSAGE.LOGIN, error);
    }
  }

  /**
   * Handles user signup by superadmin.
   * Validates the payload, checks for existing user or phone number, and creates a new user.
   */
  async doctorSignup(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const { userId } = req as ICustomRequest;
      const payload: IAuthPayload = req.body;
      const doctorPayload: IDoctorPayload = req.body;

      // Check if email already exists or phone number already exists
      const [existingUser, existingPhoneNumber] = await Promise.all([AuthService.findByEmail(doctorPayload.email), AuthService.findByPhoneNumber(doctorPayload.phone_number)]);

      if (existingUser) {
        return ResponseHandler.error(res, httpStatus.CONFLICT, false, ERROR_MESSAGE.EMAIL_ALREADY_EXISTS, `${ERROR_MESSAGE.EMAIL_ALREADY_EXISTS} ${doctorPayload.email}`);
      }

      if (existingPhoneNumber) {
        return ResponseHandler.error(
          res,
          httpStatus.CONFLICT,
          false,
          ERROR_MESSAGE.PHONE_NUMBER_ALREADY_EXISTS,
          `${ERROR_MESSAGE.PHONE_NUMBER_ALREADY_EXISTS} ${doctorPayload.phone_number}`
        );
      }

      // Hash password and create user
      const hashPassword = await convertPlainTextToHash(doctorPayload.password);

      // Create user
      await AuthService.doctorSignup(doctorPayload, hashPassword, userId);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.SIGNUP, { userEmail: payload.email });

      return ResponseHandler.success(res, httpStatus.CREATED, true, SUCCESS_MESSAGE.SIGNUP, []);
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.SIGNUP, { error: error.message || error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, ERROR_MESSAGE.SIGNUP, error);
    }
  }

  /**
   * Handles user password reset.
   * @param req
   * @param res
   * @returns
   */
  async forgetPassword(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const { email }: { email: string } = req.body;

      // check if user exists
      const user = await AuthService.findByEmail(email);

      if (!user) {
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.USER_NOT_FOUND);
      }

      // Generate a secure resent token
      const resetToken = crypto.randomBytes(20).toString('hex');
      // const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      // eslint-disable-next-line no-mixed-operators
      const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

      // Update user with reset token and expiry
      await AuthService.updateUserResetToken(user.user_id, resetToken, resetTokenExpiry);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.FORGET_PASSWORD, { email });

      // Send email with reset token
      logger.info(__filename, '', '', SUCCESS_MESSAGE.FORGET_PASSWORD, { email, resetToken });

      void AuthService.sendResetPasswordEmailWithTemplate(user, resetToken);

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.FORGET_PASSWORD, []);
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.FORGET_PASSWORD, { error: error.message || error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, ERROR_MESSAGE.FORGET_PASSWORD, error);
    }
  }

  /**
   * Resets user password.
   * @param req
   * @param res
   * @returns
   */
  async resetPassword(req: Request, res: Response): Promise<IApiResponse> {
    try {
      const { token } = req.query; // Token from URL param
      const { newPassword } = req.body; // New password from body

      // check if user exists
      if (!token) {
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.RESET_PASSWORD_TOKEN_EXPIRED);
      }

      const user = await AuthService.findByResetToken(token as string);

      if (!user) {
        return ResponseHandler.error(res, httpStatus.NOT_FOUND, false, ERROR_MESSAGE.RESET_PASSWORD_TOKEN_EXPIRED);
      }

      // Hash the provided token to compare with DB
      const hashedToken = crypto
        .createHash('sha256')
        .update(token as string)
        .digest('hex');

      // generate password
      const hashPassword = await convertPlainTextToHash(newPassword);

      // Update user password
      await AuthService.updateUserPassword(user.user_id, hashPassword);

      logger.info(__filename, '', '', SUCCESS_MESSAGE.RESET_PASSWORD, { user: user.user_id, token: hashedToken });

      void AuthService.sendPasswordSetEmailWithTemplate(user);

      return ResponseHandler.success(res, httpStatus.OK, true, SUCCESS_MESSAGE.RESET_PASSWORD, []);
    } catch (error: any) {
      logger.error(__filename, '', '', ERROR_MESSAGE.RESET_PASSWORD, { error: error.message || error });
      return ResponseHandler.error(res, httpStatus.INTERNAL_SERVER_ERROR, false, ERROR_MESSAGE.RESET_PASSWORD, error);
    }
  }
}

export default new AuthController();
