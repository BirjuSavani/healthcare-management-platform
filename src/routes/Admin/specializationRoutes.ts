import { Router } from 'express';
import specializationController from '../../components/Admin/Specialization/specializationController';
import { specializationSchema } from '../../components/Admin/Specialization/specializationValidation';
import { Role } from '../../components/Auth/interface/authInterface';
import authMiddleware from '../../middleware/authMiddleware';
import validationMiddleware from '../../middleware/joiMiddleware';
import RoleBasedAccess from '../../middleware/roleBaseAccessMiddleware';
import { asyncHandler } from '../../utils/helper/asyncHandler';

const router: Router = Router();

// Apply authMiddleware to all routes
router.use(authMiddleware);

/**
 * Create a new specialization.
 * Allowed roles: Super Admin, Admin
 * @route POST /api/admin/specialization
 */
router.post('/', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN]), validationMiddleware(specializationSchema), asyncHandler(specializationController.createSpecialization));

/**
 * Get all specializations.
 * Allowed roles: Super Admin, Admin
 * @route GET /api/admin/specializations
 */
router.get('/', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN]), asyncHandler(specializationController.getAllSpecializations));

/**
 * Update a specialization.
 * Allowed roles: Super Admin, Admin
 * @route PUT /api/admin/specialization/:id
 */
router.put('/:id', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN]), validationMiddleware(specializationSchema), asyncHandler(specializationController.updateSpecialization));

/**
 * Get a specialization by ID.
 * Allowed roles: Super Admin, Admin
 * @route GET /api/admin/specialization/:id
 */
router.get('/:id', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN]), asyncHandler(specializationController.getSpecializationById));

/**
 * Delete a specialization.
 * Allowed roles: Super Admin, Admin
 * @route DELETE /api/admin/specialization/:id
 */
router.delete('/:id', RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN]), asyncHandler(specializationController.deleteSpecialization));

export default router;
