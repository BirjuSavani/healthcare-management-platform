"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeConnection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const sequelize_1 = require("sequelize");
const message_1 = require("../../constant/message");
const logger_1 = require("../../utils/logger");
const timers_1 = require("timers");
dotenv_1.default.config();
if (!process.env.DATABASE_NAME || !process.env.DATABASE_USER || !process.env.DATABASE_PASSWORD || !process.env.DATABASE_HOST || !process.env.DATABASE_TYPE) {
    logger_1.logger.error(__filename, '', '', message_1.GLOBAL_MESSAGE.MISSING_REQUIRED_ENVIRONMENT_VARIABLES, '');
    process.exit(1); // Exit with failure
}
// sequelize config
const sequelize = new sequelize_1.Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_TYPE,
    logging: false,
    retry: {
        max: 5, // Maximum number of retries
        match: [/SequelizeConnectionError/, /SequelizeConnectionRefusedError/], // List of error codes to retry
        backoffBase: 100, // Initial backoff time in milliseconds
        backoffExponent: 1 // Backoff exponent factor for each retry
    }
});
const connectWithRetry = () => __awaiter(void 0, void 0, void 0, function* () {
    let retries = 5;
    while (retries > 0) {
        // Changed from "while (retries < 5)"
        try {
            yield sequelize.authenticate();
            logger_1.logger.info(__filename, '', '', 'Database connection established successfully'); // Added success log
            return;
        }
        catch (error) {
            retries--;
            logger_1.logger.error(__filename, '', '', `Database connection failed. Retries left: ${retries}`, error);
            if (retries === 0) {
                logger_1.logger.error(__filename, '', '', 'Max retries reached. Could not connect to database', '');
                process.exit(1);
            }
            else {
                yield new Promise((resolve) => (0, timers_1.setTimeout)(resolve, 5000));
            }
        }
    }
});
// Initialize connection
const initializeConnection = () => __awaiter(void 0, void 0, void 0, function* () { return connectWithRetry(); });
exports.initializeConnection = initializeConnection;
exports.default = sequelize;
//# sourceMappingURL=config.js.map