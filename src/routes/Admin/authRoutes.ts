import { Router } from 'express';
import authController from '../../components/Auth/authController';
import { authSchema, doctorSchema, loginSchema } from '../../components/Auth/authValidation';
import { Role } from '../../components/Auth/interface/authInterface';
import authMiddleware from '../../middleware/authMiddleware';
import validationMiddleware from '../../middleware/joiMiddleware';
import RoleBasedAccess from '../../middleware/roleBaseAccessMiddleware';
import { asyncHandler } from '../../utils/helper/asyncHandler';

const router: Router = Router();

/**
 * Handles user signup by super admin, admin, or doctor.
 * Validates the payload, checks for existing user or phone number, and creates a new user.
 * @route POST /api/auth/signup
 * @access Super Admin, Admin, Doctor
 */
router.post('/admin/signup', authMiddleware, RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR]), validationMiddleware(authSchema), asyncHandler(authController.signup));

/**
 * End user signup.
 * @route POST /api/auth/user/signup
 */
router.post('/user/signup', validationMiddleware(authSchema), asyncHandler(authController.signup));

/**
 * Doctor signup.
 * @route POST /api/auth/doctor/signup
 */
router.post('/doctor/signup', authMiddleware, validationMiddleware(doctorSchema), asyncHandler(authController.doctorSignup));

/**
 * Handles user login.
 * Validates credentials, generates a token, and returns user data.
 * @route POST /api/auth/login
 */
router.post('/login', validationMiddleware(loginSchema), asyncHandler(authController.login));

/**
 * Forget password.
 * @route POST /api/auth/forget-password
 */
router.post('/forget-password', asyncHandler(authController.forgetPassword));

/**
 * Reset password.
 * @route POST /api/auth/reset-password
 */
router.post('/reset-password', asyncHandler(authController.resetPassword));

export default router;
