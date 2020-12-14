const { logCreateActivity, logDeleteActivity, logUpdateActivity } = require('../misc/misc');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
      product_name: {
        allowNull: false,
        type: DataTypes.STRING
      },
      product_description: {
        allowNull: false,
        type: DataTypes.STRING
      },
      quantity: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      product_price: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
    }, {
        paranoid: true,
        deletedAt: 'deleted_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            afterCreate: (product, options) => logCreateActivity(product, options),
            afterUpdate: (product, options) => logUpdateActivity(product, options),
            afterDestroy: (product, options) => logDeleteActivity(product, options),
        },
    });
    Product.associate = (models) => {

    };
    return Product;
};