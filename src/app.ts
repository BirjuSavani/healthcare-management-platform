import express, { Application } from 'express';
import middleware from './middleware';
import routes from './routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Middleware
middleware(app);

// Routes
routes(app);

// Handle invalid routes
// app.all('/*', (req: Request, res: Response) => {
//   logger.error(__filename, 'Invalid Route Handler', '', 'Invalid Route Fired : ' + req.path, {});
//   return ResponseHandler.error(httpStatus.BAD_REQUEST, false, GLOBAL_MESSAGE.BAD_REQUEST, GLOBAL_MESSAGE.BAD_REQUEST);
// });

export default app;
