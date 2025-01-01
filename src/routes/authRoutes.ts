import { Router } from 'express';
import authController from '../components/Auth/authController';
import { authSchema, loginSchema } from '../components/Auth/authValidation';
import { IRole } from '../components/Auth/interface/authInterface';
import authMiddleware from '../middleware/authMiddleware';
import validationMiddleware from '../middleware/joiMiddleware';
import RoleBasedAccess from '../middleware/roleBaseAccessMiddleware';
import { asyncHandler } from '../utils/helper/asyncHandler';

const router: Router = Router();

/**
 * Handles user signup by super admin, admin, or doctor.
 * Validates the payload, checks for existing user or phone number, and creates a new user.
 * @route POST /api/auth/signup
 * @access Super Admin, Admin, Doctor
 */
router.post(
  '/admin/signup',
  authMiddleware,
  RoleBasedAccess([IRole.SUPER_ADMIN, IRole.ADMIN, IRole.DOCTOR]),
  validationMiddleware(authSchema),
  asyncHandler(authController.signup)
);

/**
 * End user signup.
 * @route POST /api/auth/user/signup
 */
router.post('/user/signup', validationMiddleware(authSchema), asyncHandler(authController.signup));

/**
 * Handles user login.
 * Validates credentials, generates a token, and returns user data.
 * @route POST /api/auth/login
 */
router.post('/login', validationMiddleware(loginSchema), asyncHandler(authController.login));

export default router;
