"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../../components/Auth/authController"));
const authValidation_1 = require("../../components/Auth/authValidation");
const authInterface_1 = require("../../components/Auth/interface/authInterface");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const joiMiddleware_1 = __importDefault(require("../../middleware/joiMiddleware"));
const roleBaseAccessMiddleware_1 = __importDefault(require("../../middleware/roleBaseAccessMiddleware"));
const asyncHandler_1 = require("../../utils/helper/asyncHandler");
const router = (0, express_1.Router)();
/**
 * Handles user signup by super admin, admin, or doctor.
 * Validates the payload, checks for existing user or phone number, and creates a new user.
 * @route POST /api/auth/signup
 * @access Super Admin, Admin, Doctor
 */
router.post('/admin/signup', authMiddleware_1.default, (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN, authInterface_1.Role.DOCTOR]), (0, joiMiddleware_1.default)(authValidation_1.authSchema), (0, asyncHandler_1.asyncHandler)(authController_1.default.signup));
/**
 * End user signup.
 * @route POST /api/auth/user/signup
 */
router.post('/user/signup', (0, joiMiddleware_1.default)(authValidation_1.authSchema), (0, asyncHandler_1.asyncHandler)(authController_1.default.signup));
/**
 * Doctor signup.
 * @route POST /api/auth/doctor/signup
 */
router.post('/doctor/signup', authMiddleware_1.default, (0, joiMiddleware_1.default)(authValidation_1.doctorSchema), (0, asyncHandler_1.asyncHandler)(authController_1.default.doctorSignup));
/**
 * Handles user login.
 * Validates credentials, generates a token, and returns user data.
 * @route POST /api/auth/login
 */
router.post('/login', (0, joiMiddleware_1.default)(authValidation_1.loginSchema), (0, asyncHandler_1.asyncHandler)(authController_1.default.login));
/**
 * Forget password.
 * @route POST /api/auth/forget-password
 */
router.post('/forget-password', (0, asyncHandler_1.asyncHandler)(authController_1.default.forgetPassword));
/**
 * Reset password.
 * @route POST /api/auth/reset-password
 */
router.post('/reset-password', (0, asyncHandler_1.asyncHandler)(authController_1.default.resetPassword));
exports.default = router;
//# sourceMappingURL=authRoutes.js.map