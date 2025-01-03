import { Router } from 'express';
import userController from '../components/User/userController';
import authMiddleware from '../middleware/authMiddleware';
import { asyncHandler } from '../utils/helper/asyncHandler';

const router: Router = Router();
// Apply authMiddleware to all routes
router.use(authMiddleware);

/**
 * Get user profile.
 * @route GET /api/user/profile
 */
router.get('/profile', asyncHandler(userController.getUserProfile));

export default router;
