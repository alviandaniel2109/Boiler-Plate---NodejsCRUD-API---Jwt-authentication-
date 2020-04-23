module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Admins', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        role_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        username: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        active: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
        created_by: {
            allowNull: true,
            type: Sequelize.STRING,
        },
        modified_by: {
            allowNull: true,
            type: Sequelize.STRING,
        },
        created_at: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updated_at: {
            type: Sequelize.DATE,
        },
        deleted_at: {
            type: Sequelize.DATE,
        },
    }),
    // eslint-disable-next-line no-unused-vars
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Admins'),
};
