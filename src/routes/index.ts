import { Application, Router } from 'express';
import AuthRouter from './authRoutes';
import UserRouter from './userRoutes';

export default (app: Application) => {
  const apiRouter: Router = Router();

  /**
   * ! All routes must to prefix with /api
   */

  app.use('/api', apiRouter);

  apiRouter.use('/auth', AuthRouter);

  apiRouter.use('/user', UserRouter);
};
