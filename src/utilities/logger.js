import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

class Logger {
  constructor() {
    if (!Logger.instance) {
      Logger.instance = winston.createLogger({
        level: 'info',
        transports: [
          new winston.transports.Console({
            level: 'info',
            format: winston.format.cli(),
          }),
          new DailyRotateFile({
            filename: 'logs/%DATE%_debug.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            level: 'debug',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
            ),
          }),
          new DailyRotateFile({
            filename: 'logs/%DATE%_error.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            level: 'error',
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.json(),
            ),
          }),
        ],
      });
    }

    return Logger.instance;
  }
}

const instance = new Logger();
Object.freeze(instance);
export default instance;
