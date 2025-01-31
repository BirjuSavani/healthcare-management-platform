import { Router } from 'express';
import userController from '../../components/User/Profile/userController';
import authMiddleware from '../../middleware/authMiddleware';
import { asyncHandler } from '../../utils/helper/asyncHandler';
import ReviewRouter from './reviewRoutes';

const router: Router = Router();

const ROUTES = {
  REVIEW: '/review'
};

router.use(ROUTES.REVIEW, ReviewRouter);

// Apply authMiddleware to all routes
router.use(authMiddleware);

/**
 * Get user profile.
 * @route GET /api/user/profile
 */
router.get('/profile', asyncHandler(userController.getUserProfile));

/**
 * Update user profile.
 * @route PUT /api/user/profile
 */
router.put('/profile/:id', asyncHandler(userController.updateUserProfile));

export default router;
