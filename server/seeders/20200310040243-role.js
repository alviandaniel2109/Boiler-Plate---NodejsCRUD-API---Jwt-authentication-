module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert('Roles', [{
        name: 'Superadmin',
        created_at: new Date(),
        updated_at: new Date(),
    }, {
        name: 'Admin',
        created_at: new Date(),
        updated_at: new Date(),
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete('Roles', null, { truncate: true, restartIdentity: true }),
};
