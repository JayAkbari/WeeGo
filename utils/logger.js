const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

// Create a transport for daily log files
const dailyRotateTransport = new DailyRotateFile({
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYYMMDD',
    zippedArchive: true,
    maxSize: '20m', // optional: rotate files if they exceed 20 megabytes
    maxFiles: '1d',  // optional: keep logs for 14 days
    auditFile: 'logs/audit.json', // optional: keeps track of rotated files
});

// Define a custom format
const customFormat = winston.format.printf(({ level, message, timestamp, stack, meta }) => {
    const logObject = { level, message, timestamp, stack, meta };
    return JSON.stringify(logObject, null, 2);
});

// Configure Winston with custom format
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }), // Capture stack trace for errors
        customFormat
    ),
    transports: [
        dailyRotateTransport,
        new winston.transports.Console(),
    ],
    exceptionHandlers: [
        new DailyRotateFile({ filename: 'logs/exceptions-%DATE%.log', datePattern: 'YYYYMMDD' })
    ],
    rejectionHandlers: [
        new DailyRotateFile({ filename: 'logs/rejections-%DATE%.log', datePattern: 'YYYYMMDD' })
    ]
});

module.exports = { logger };
