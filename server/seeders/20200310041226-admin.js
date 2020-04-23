const bcrypt = require('bcrypt');

module.exports = {
    up: (queryInterface) => queryInterface.bulkInsert('Admins', [{
        role_id: 1,
        email: 'superadmin@liniads.com',
        username: 'Superadmin',
        password: bcrypt.hashSync('Superadmin@liniads2020', 10),
        active: true,
        created_by: null,
        modified_by: null,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
    }, {
        role_id: 2,
        email: 'admin@liniads.com',
        username: 'Admin',
        password: bcrypt.hashSync('Admin@liniads2020', 10),
        active: true,
        created_by: null,
        modified_by: null,
        created_at: new Date(),
        updated_at: null,
        deleted_at: null,
    }], {}),

    down: (queryInterface) => queryInterface.bulkDelete('Admins', null, { truncate: true, restartIdentity: true }),
};
