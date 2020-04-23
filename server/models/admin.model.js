const { logCreateActivity, logDeleteActivity, logUpdateActivity } = require('../misc/misc');

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        role_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        username: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        created_by: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        modified_by: {
            allowNull: true,
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            afterCreate: (admin, options) => logCreateActivity(admin, options),
            afterUpdate: (admin, options) => logUpdateActivity(admin, options),
            afterDestroy: (admin, options) => logDeleteActivity(admin, options),
        },
    });
    Admin.associate = (models) => {
        Admin.belongsTo(models.Role, {
            foreignKey: 'role_id',
            as: 'role',
        });
    };
    return Admin;
};
