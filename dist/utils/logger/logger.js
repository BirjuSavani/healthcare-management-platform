"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const winston_1 = require("winston");
require("winston-daily-rotate-file");
const { combine, printf } = winston_1.format;
const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
class Logging {
    /**
     * Creates an instance of Logging.
     */
    constructor() {
        /**
         * Creates an instance of Logging.
         * Description: Creates an instance of Logging with daily rotate file.
         */
        this.transport = new winston_1.transports.DailyRotateFile({
            filename: `./logs/${date}/%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '7d'
        });
        this.myFormat = printf(({ level, message }) => {
            return `[${moment_timezone_1.default.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')}] ${level}: ${message}`;
        });
        this.logger = (0, winston_1.createLogger)({
            format: combine(winston_1.format.timestamp({
                format: () => moment_timezone_1.default.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss')
            }), winston_1.format.json()),
            transports: [
                this.transport,
                new winston_1.transports.Console({
                    format: winston_1.format.combine(winston_1.format.colorize(), this.myFormat)
                })
            ]
        });
    }
    /**
     * This function is used to get the label of the file.
     * @param {string} fileName
     */
    getLabel(fileName) {
        const parts = fileName.split('/');
        return parts[parts.length - 2] + '/' + parts.pop();
    }
    /**
     * This function is used to set the label of the file.
     * @param fileName
     * @param method
     * @returns
     */
    setLabel(fileName, method) {
        let label = this.getLabel(fileName);
        label += method ? ` ~ ${method}` : '';
        return label;
    }
    // Public methods for external use
    error(fileName, method, uuid, msg, data = {}) {
        this.logger.error(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
    }
    warn(fileName, method, uuid, msg, data = {}) {
        this.logger.warn(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
    }
    info(fileName, method, uuid, msg, data = {}) {
        this.logger.info(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
    }
    debug(fileName, method, uuid, msg, data = {}) {
        this.logger.debug(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
    }
    verbose(fileName, method, uuid, msg, data = {}) {
        this.logger.verbose(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
    }
    silly(fileName, method, uuid, msg, data = {}) {
        this.logger.silly(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
    }
}
const logger = new Logging();
exports.default = logger;
//# sourceMappingURL=logger.js.map