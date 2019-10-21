require('dotenv').config();

module.exports = {
    development: {
        database: process.env.UNIQUE_NAME_PG_DB,
        host: process.env.UNIQUE_NAME_PG_HOST,
        username: process.env.UNIQUE_NAME_PG_USER,
        password: process.env.UNIQUE_NAME_PG_PASSWD,
        dialect: 'postgres',
    },
    test: {
        database: process.env.UNIQUE_NAME_PG_TEST_DB,
        host: process.env.UNIQUE_NAME_PG_HOST,
        username: process.env.UNIQUE_NAME_PG_USER,
        password: process.env.UNIQUE_NAME_PG_PASSWD,
        dialect: 'postgres',
    },
};
