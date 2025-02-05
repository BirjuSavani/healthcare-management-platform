"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = __importDefault(require("../../components/Admin/User/adminController"));
const adminValidation_1 = require("../../components/Admin/User/adminValidation");
const authInterface_1 = require("../../components/Auth/interface/authInterface");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const joiMiddleware_1 = __importDefault(require("../../middleware/joiMiddleware"));
const roleBaseAccessMiddleware_1 = __importDefault(require("../../middleware/roleBaseAccessMiddleware"));
const asyncHandler_1 = require("../../utils/helper/asyncHandler");
const router = (0, express_1.Router)();
// Apply authMiddleware to all routes
router.use(authMiddleware_1.default);
/**
 * Get all users.
 * Allowed roles: Super Admin, Admin
 * @route GET /api/admin/users
 */
router.get('/', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN]), (0, asyncHandler_1.asyncHandler)(adminController_1.default.getAllUsers));
/**
 * Get By Id user.
 * @route GET /api/admin/users/:id
 */
router.get('/:id', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN]), (0, asyncHandler_1.asyncHandler)(adminController_1.default.getUserById));
/**
 * Update user profile with role is admin or end user.
 * @route PUT /api/admin/user/:id
 */
router.put('/:id', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN, authInterface_1.Role.END_USER]), (0, joiMiddleware_1.default)(adminValidation_1.updateUserSchema), (0, asyncHandler_1.asyncHandler)(adminController_1.default.updateUser));
/**
 * Delete user.
 * @route DELETE /api/admin/user/:id
 */
router.delete('/:id', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN]), (0, asyncHandler_1.asyncHandler)(adminController_1.default.deleteUser));
exports.default = router;
//# sourceMappingURL=adminUserRoutes.js.map