import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import httpStatus from 'http-status';
import path from 'path';
import { GLOBAL_MESSAGE } from './constant/message';
import middleware from './middleware';
import routes from './routes';
import { ResponseHandler } from './utils/helper';
import { logger } from './utils/logger';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './notification/templates'));
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(
  cors({
    origin: 'http://localhost:5173', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow only GET and POST methods
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Middleware
middleware(app);

// Routes
routes(app);

// Base route to health check
app.get('/health', (req: Request, res: Response): any => {
  return ResponseHandler.success(res, httpStatus.OK, true, 'health', 'Healthy');
});

// Handle invalid routes
app.all('/*', (req: Request, res: Response): any => {
  logger.error(__filename, 'Invalid Route Handler', '', 'Invalid Route Fired : ' + req.path, {});
  return ResponseHandler.error(res, httpStatus.BAD_REQUEST, false, GLOBAL_MESSAGE.BAD_REQUEST, GLOBAL_MESSAGE.BAD_REQUEST);
});

export default app;
