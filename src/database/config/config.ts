import dotenv from 'dotenv';
// import { Dialect, Sequelize } from 'sequelize';
import { setTimeout } from 'timers';
import { GLOBAL_MESSAGE } from '../../constant/message';
import { logger } from '../../utils/logger';
import { Sequelize } from 'sequelize';

dotenv.config();

if (!process.env.DATABASE_NAME || !process.env.DATABASE_USER || !process.env.DATABASE_PASSWORD || !process.env.DATABASE_HOST || !process.env.DATABASE_TYPE) {
  logger.error(__filename, '', '', GLOBAL_MESSAGE.MISSING_REQUIRED_ENVIRONMENT_VARIABLES, '');
  process.exit(1); // Exit with failure
}

// // sequelize config
// const sequelize: Sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//   host: process.env.DATABASE_HOST,
//   dialect: process.env.DATABASE_TYPE as Dialect,
//   logging: false,
//   retry: {
//     max: 5, // Maximum number of retries
//     match: [/SequelizeConnectionError/, /SequelizeConnectionRefusedError/], // List of error codes to retry
//     backoffBase: 100, // Initial backoff time in milliseconds
//     backoffExponent: 1 // Backoff exponent factor for each retry
//   }
// });

const sequelize: Sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

const connectWithRetry = async (): Promise<void> => {
  let retries = 5;

  while (retries > 0) {
    // Changed from "while (retries < 5)"
    try {
      await sequelize.authenticate();
      logger.info(__filename, '', '', 'Database connection established successfully'); // Added success log
      return;
    } catch (error) {
      retries--;
      logger.error(__filename, '', '', `Database connection failed. Retries left: ${retries}`, error);

      if (retries === 0) {
        logger.error(__filename, '', '', 'Max retries reached. Could not connect to database', '');
        process.exit(1);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
    }
  }
};

// Initialize connection
export const initializeConnection = async (): Promise<void> => connectWithRetry();

export default sequelize;
