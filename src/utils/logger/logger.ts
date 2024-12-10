import moment from 'moment';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
const { combine, printf } = format;

const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;

class Logging {
  public logger: any;

  /**
   * Creates an instance of Logging.
   * Description: Creates an instance of Logging with daily rotate file.
   */
  public transport = new transports.DailyRotateFile({
    filename: `./logs/${date}/%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d',
  });

  public myFormat = printf(({ level, message }) => {
    return `${moment.utc().format()} ${level}: ${message}`;
  });

  /**
   * Creates an instance of Logging.
   */
  constructor() {
    this.logger = createLogger({
      format: combine(format.timestamp(), format.json()),
      transports: [
        this.transport,
        new transports.Console({
          format: format.combine(format.colorize(), this.myFormat),
        }),
      ],
    });
  }

  /**
   * This function is used to get the label of the file.
   * @param {string} fileName
   */
  public getLabel(fileName: string) {
    const parts = fileName.split('/');
    return parts[parts.length - 2] + '/' + parts.pop();
  }

  /**
   * This function is used to set the label of the file.
   * @param fileName
   * @param method
   * @returns
   */
  public setLabel(fileName: string, method: string) {
    let label = this.getLabel(fileName);
    label += method ? ` ~ ${method}` : '';
    return label;
  }

  // Public methods for external use
  public error(fileName: string, method: string, uuid: string, msg: string, data: any = {}) {
    this.logger.error(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
  }

  public warn(fileName: string, method: string, uuid: string, msg: string, data: any = {}) {
    this.logger.warn(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
  }

  public info(fileName: string, method: string, uuid: string, msg: string, data: any = {}) {
    this.logger.info(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
  }

  public debug(fileName: string, method: string, uuid: string, msg: string, data: any = {}) {
    this.logger.debug(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
  }

  public verbose(fileName: string, method: string, uuid: string, msg: string, data: any = {}) {
    this.logger.verbose(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
  }

  public silly(fileName: string, method: string, uuid: string, msg: string, data: any = {}) {
    this.logger.silly(`[${this.setLabel(fileName, method)}] ${uuid} - ${msg}`, data ? data : '', '');
  }
}

const logger = new Logging();

export default logger;
