/* eslint-disable new-cap */
import Winston from 'winston';
import moment from 'moment-timezone';
import winstonHttp from 'winston-transport-http-stream';

const logger = new (Winston.createLogger)({
    transports: [
        new (Winston.transports.Console)({
            json: true,
            colorize: true,
        }),
    ],
});

const mongoLogger = new (Winston.createLogger)({
    level: 'info',
    transports: [
        new Winston.transports.File({
            filename: `logs/${moment(new Date()).tz('Asia/Jakarta').format('YYYY-MM-DD')}.log`,
        }),
        new winstonHttp({
            url: `${process.env.FLUENTD_URL}:${process.env.FLUENTD_PORT}/${process.env.FLUENTD_DB}`,
            options: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        }),
    ],
});

export default {
    logger,
    mongoLogger,
};
