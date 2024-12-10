import { Application, Router } from 'express';

export default (app: Application) => {
  const apiRouter: Router = Router();

  /**
   * ! All routes must to prefix with /api
   */

  app.use('/api', apiRouter);
};
