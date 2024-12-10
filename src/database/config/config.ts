import dotenv from 'dotenv';
import { Dialect, Sequelize } from 'sequelize';
import { GLOBAL_MESSAGE } from '../../constant/message';
import { logger } from '../../utils/logger';

dotenv.config();

if (
  !process.env.DATABASE_NAME ||
  !process.env.DATABASE_USER ||
  !process.env.DATABASE_PASSWORD ||
  !process.env.DATABASE_HOST ||
  !process.env.DATABASE_TYPE
) {
  logger.error(__filename, '', '', GLOBAL_MESSAGE.MISSING_REQUIRED_ENVIRONMENT_VARIABLES, '');
  process.exit(1); // Exit with failure
}

// sequelize config
const sequelize: Sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_TYPE as Dialect,
    logging: false,
  }
);

export default sequelize;
