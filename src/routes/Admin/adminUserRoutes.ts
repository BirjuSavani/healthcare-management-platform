import { Router } from 'express';
import adminController from '../../components/Admin/User/adminController';
import { updateUserSchema } from '../../components/Admin/User/adminValidation';
import { Role } from '../../components/Auth/interface/authInterface';
import authMiddleware from '../../middleware/authMiddleware';
import validationMiddleware from '../../middleware/joiMiddleware';
import RoleBasedAccess from '../../middleware/roleBaseAccessMiddleware';
import { asyncHandler } from '../../utils/helper/asyncHandler';

const router: Router = Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

/**
 * Get all users.
 * Allowed roles: Super Admin, Admin
 * @route GET /api/admin/users
 */
router.get('/', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN]), asyncHandler(adminController.getAllUsers));

/**
 * Get By Id user.
 * @route GET /api/admin/users/:id
 */
router.get('/:id', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN]), asyncHandler(adminController.getUserById));

/**
 * Update user profile with role is admin or end user.
 * @route PUT /api/admin/user/:id
 */
router.put('/:id', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN, Role.END_USER]), validationMiddleware(updateUserSchema), asyncHandler(adminController.updateUser));

/**
 * Delete user.
 * @route DELETE /api/admin/user/:id
 */
router.delete('/:id', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN]), asyncHandler(adminController.deleteUser));

export default router;
