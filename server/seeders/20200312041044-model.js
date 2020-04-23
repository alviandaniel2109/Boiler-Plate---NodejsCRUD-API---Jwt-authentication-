const fs = require('fs');

module.exports = {
    up: async (queryInterface) => {
        const newData = [];
        const rawData = fs.readFileSync('server/masterdata/model.json');
        const Models = JSON.parse(rawData);
        await Promise.all(Models.map(async (model) => {
            const seedData = {
                name: model.name,
                deleted_at: null,
                created_at: new Date(),
                updated_at: new Date(),
            };
            newData.push(seedData);
        }));

        return queryInterface.bulkInsert('Models', newData);
    },

    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Models', null, { truncate: true, restartIdentity: true }),
};
