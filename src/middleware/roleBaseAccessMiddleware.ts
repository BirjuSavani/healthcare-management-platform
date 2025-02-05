import { NextFunction, Request, Response } from 'express';
import { ERROR_MESSAGE, GLOBAL_MESSAGE } from '../constant/message';
import { ResponseHandler } from '../utils/helper';
import { ICustomRequest } from './authMiddleware';

// Define Custom Request Interface
// export interface ICustomRequest extends Request {
//   currentUser?: {
//     user_id: string;
//     role: string;
//     [key: string]: any;
//   };
// }

/**
 * Role-Based Access Middleware
 * @param allowedRoles - An array of roles allowed to access the route.
 * @returns Middleware function for role-based access control.
 */
const RoleBasedAccess = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): any => {
    const customReq = req as ICustomRequest;

    // Check if the current user exists on the request (should be set by previous auth middleware)
    const user = customReq.currentUser;

    if (!user) {
      return ResponseHandler.error(res, 401, false, GLOBAL_MESSAGE.UNAUTHORIZED, ERROR_MESSAGE.UNAUTHORIZED_ACCESS);
    }

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(user.role)) {
      return ResponseHandler.error(res, 403, false, GLOBAL_MESSAGE.FORBIDDEN, ERROR_MESSAGE.UNAUTHORIZED_ACCESS);
    }

    // User is authorized; proceed to the next middleware or route handler
    next();
  };
};

export default RoleBasedAccess;
