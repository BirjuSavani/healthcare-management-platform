"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../constant/message");
const helper_1 = require("../utils/helper");
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
const RoleBasedAccess = (allowedRoles) => {
    return (req, res, next) => {
        const customReq = req;
        // Check if the current user exists on the request (should be set by previous auth middleware)
        const user = customReq.currentUser;
        if (!user) {
            return helper_1.ResponseHandler.error(res, 401, false, message_1.GLOBAL_MESSAGE.UNAUTHORIZED, message_1.ERROR_MESSAGE.UNAUTHORIZED_ACCESS);
        }
        // Check if user's role is in the allowed roles
        if (!allowedRoles.includes(user.role)) {
            return helper_1.ResponseHandler.error(res, 403, false, message_1.GLOBAL_MESSAGE.FORBIDDEN, message_1.ERROR_MESSAGE.UNAUTHORIZED_ACCESS);
        }
        // User is authorized; proceed to the next middleware or route handler
        next();
    };
};
exports.default = RoleBasedAccess;
//# sourceMappingURL=roleBaseAccessMiddleware.js.map