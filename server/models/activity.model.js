module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        target_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        user_model_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        target_model_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
        user_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        target_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    Activity.associate = () => {
        // associations can be defined here
    };
    return Activity;
};
