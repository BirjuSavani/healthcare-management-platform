import { Router } from 'express';
import { updateDoctorSchema } from '../../components/Auth/authValidation';
import { Role } from '../../components/Auth/interface/authInterface';
import doctorController from '../../components/Doctor/doctorController';
import authMiddleware from '../../middleware/authMiddleware';
import validationMiddleware from '../../middleware/joiMiddleware';
import RoleBasedAccess from '../../middleware/roleBaseAccessMiddleware';
import { asyncHandler } from '../../utils/helper/asyncHandler';

const router: Router = Router();

/**
 * Get all doctors
 * @route GET /api/doctor
 */
router.get('/', asyncHandler(doctorController.getAllDoctors));

/**
 * Get By Id doctor.
 * @route GET /api/doctor/:id
 */
router.get('/:id', asyncHandler(doctorController.getDoctorById));

/**
 * Update doctor
 * @route PUT /api/doctor/:id
 */
router.put(
  '/:id',
  authMiddleware,
  validationMiddleware(updateDoctorSchema),
  RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR]),
  asyncHandler(doctorController.updateDoctorProfile)
);

/**
 * Delete doctor
 * @route DELETE /api/doctor/:id
 */
router.delete('/:id', authMiddleware, RoleBasedAccess([Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR]), asyncHandler(doctorController.deleteDoctor));

export default router;
