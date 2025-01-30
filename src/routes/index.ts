import { Application, Router } from 'express';
import AdminRouter from './Admin/adminRoutes';
import AuthRouter from './Admin/authRoutes';
import UserRouter from './User/userRoutes';
import DoctorRouter from './Doctor/doctorRoutes';

export default (app: Application) => {
  const apiRouter: Router = Router();

  /**
   * ! All routes must to prefix with /api
   */

  app.use('/api', apiRouter);

  apiRouter.use('/auth', AuthRouter);

  apiRouter.use('/admin', AdminRouter);
  apiRouter.use('/doctor', DoctorRouter);
  apiRouter.use('/user', UserRouter);
};
