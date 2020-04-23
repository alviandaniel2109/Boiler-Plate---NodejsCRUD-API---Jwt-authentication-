const { logCreateActivity, logDeleteActivity, logUpdateActivity } = require('../misc/misc');

module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            afterCreate: (role, options) => logCreateActivity(role, options),
            afterUpdate: (role, options) => logUpdateActivity(role, options),
            afterDestroy: (role, options) => logDeleteActivity(role, options),
        },
    });
    Role.associate = () => {
        // associations can be defined here
    };
    return Role;
};
