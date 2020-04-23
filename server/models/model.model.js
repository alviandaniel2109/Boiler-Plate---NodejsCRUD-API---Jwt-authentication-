module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Model', {
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    });
    Model.associate = () => {
        // associations can be defined here
    };
    return Model;
};
