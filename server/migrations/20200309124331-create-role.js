module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.createTable('Roles', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
        },
        name: {
            allowNull: false,
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
    down: (queryInterface, Sequelize) => queryInterface.dropTable('Roles'),
};
