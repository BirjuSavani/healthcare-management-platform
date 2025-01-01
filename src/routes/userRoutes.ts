import { Router } from 'express';
import { IRole } from '../components/Auth/interface/authInterface';
import userController from '../components/User/userController';
import authMiddleware from '../middleware/authMiddleware';
import RoleBasedAccess from '../middleware/roleBaseAccessMiddleware';
import { asyncHandler } from '../utils/helper/asyncHandler';

const router: Router = Router();
// Apply authMiddleware to all routes
router.use(authMiddleware);

/**
 * Get all users.
 * @route GET /api/user
 */
router.get(
  '/',
  RoleBasedAccess([IRole.SUPER_ADMIN, IRole.ADMIN, IRole.DOCTOR]),
  asyncHandler(userController.getAllUsers)
);

/**
 * Get user profile.
 */
router.get('/profile', asyncHandler(userController.getUserProfile));

export default router;
