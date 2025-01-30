import { Router } from 'express';
import AdminUserRouter from './adminUserRoutes';
import SpecializationRouter from './specializationRoutes';

const router: Router = Router();

const ROUTES = {
  SPECIALIZATION: '/specialization',
  USER: '/users',
};

/**
 * * Specialization routes
 */
router.use(ROUTES.SPECIALIZATION, SpecializationRouter);

/**
 * * User routes
 */
router.use(ROUTES.USER, AdminUserRouter);

export default router;
