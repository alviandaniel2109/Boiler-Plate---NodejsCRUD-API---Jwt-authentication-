import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import config from './config';

const db = {};

const sequelizeOptions = {
    dialect: 'postgres',
    port: config.postgres.port,
    host: config.postgres.host,
    operatorsAliases: 0,
    logging: 0,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
};
if (config.postgres.ssl) {
    sequelizeOptions.ssl = config.postgres.ssl;
}
if (config.postgres.ssl && config.postgres.ssl_ca_cert) {
    sequelizeOptions.ssl = { ca: config.postgres.ssl_ca_cert };
}
const sequelize = new Sequelize(config.postgres.db,
    config.postgres.user,
    config.postgres.passwd,
    sequelizeOptions);

const modelsDir = path.normalize(`${__dirname}/../server/models`);

fs.readdirSync(modelsDir)
    .filter((file) => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
    .forEach((file) => {
        console.log(`Loading model file ${file}`); // eslint-disable-line no-console
        const model = sequelize.import(path.join(modelsDir, file));
        db[model.name] = model;
    });

sequelize
    .sync()
    .then(() => {
        console.log('Database synchronized'); // eslint-disable-line no-console
    })
    .catch((error) => {
        if (error) console.log('An error occured %j', error); // eslint-disable-line no-console
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
