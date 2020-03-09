import http from 'http';
import config from './config/config';
import app from './config/express';

const server = http.Server(app);

require('dotenv').config();

// module.parent check is required to support mocha watch
if (!module.parent) {
    // listen on port config.port
    server.listen(config.port, () => {
        console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
    });
}

export default app;
