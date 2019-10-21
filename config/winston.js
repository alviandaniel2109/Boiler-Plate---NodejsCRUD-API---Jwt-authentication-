import winston from 'winston';

// eslint-disable-next-line new-cap
const logger = new (winston.createLogger)({
    transports: [
        new (winston.transports.Console)({
            json: true,
            colorize: true,
        }),
    ],
});

export default logger;
