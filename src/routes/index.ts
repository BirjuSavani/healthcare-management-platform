import { Application, Router } from 'express';
import AdminRouter from './adminRoutes';
import AuthRouter from './authRoutes';
import UserRouter from './userRoutes';

export default (app: Application) => {
  const apiRouter: Router = Router();

  /**
   * ! All routes must to prefix with /api
   */

  app.use('/api', apiRouter);

  apiRouter.use('/auth', AuthRouter);

  apiRouter.use('/admin', AdminRouter);
  // apiRouter.use('/doctor', DoctorRouter);
  apiRouter.use('/user', UserRouter);
};
