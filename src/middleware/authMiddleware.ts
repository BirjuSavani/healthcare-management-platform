import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../components/Auth/authService';
import { ERROR_MESSAGE, GLOBAL_MESSAGE } from '../constant/message';
import { ResponseHandler } from '../utils/helper';
import { logger } from '../utils/logger';

export interface ICustomRequest extends Request {
  userId: string;
  role: string;
  [key: string]: any;
}

// interface User {
//   role: string;
// }

function verifyToken(token: string): any {
  try {
    // Check if not set JWT_SECRET in environment
    if (!process.env.JWT_SECRET) {
      throw new Error(ERROR_MESSAGE.JWT_SECRET_NOT_SET);
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    const userTokenData = {
      userId: decoded.userId,
      role: decoded.role,
      iat: decoded.iat,
      exp: decoded.exp
    };

    return userTokenData;
  } catch (error) {
    return error;
  }
}

async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    // const customReq = req as CustomRequest;

    // Extract Authorization header
    const authorization = req.headers.authorization;

    if (!authorization) {
      return ResponseHandler.error(res, 401, false, GLOBAL_MESSAGE.UNAUTHORIZED, GLOBAL_MESSAGE.UNAUTHORIZED);
    }

    // Verify the token and get the user
    const token = authorization.split(' ')[1];

    if (!token) {
      return ResponseHandler.error(res, 401, false, GLOBAL_MESSAGE.UNAUTHORIZED, GLOBAL_MESSAGE.UNAUTHORIZED);
    }

    const userTokenData: any = verifyToken(token);

    if (!userTokenData) {
      return ResponseHandler.error(res, 401, false, GLOBAL_MESSAGE.UNAUTHORIZED, GLOBAL_MESSAGE.UNAUTHORIZED);
    }

    // Check if user is exists
    const currentUser = await AuthService.findById(userTokenData.userId);

    if (!currentUser) {
      return ResponseHandler.error(res, 401, false, GLOBAL_MESSAGE.UNAUTHORIZED, GLOBAL_MESSAGE.UNAUTHORIZED);
    }

    // Dynamically attach properties to the request
    (req as ICustomRequest).userId = currentUser.user_id;
    (req as ICustomRequest).role = currentUser.role;
    (req as ICustomRequest).currentUser = currentUser;

    next();
  } catch (error) {
    logger.error(__filename, req.method, '', GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
    return ResponseHandler.error(res, 500, false, GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
  }
}

export default authMiddleware;
