module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Products', [{
    product_name: 'Android',
    product_description: 'Lolipop versi 2020',
    quantity: '3000',
    product_price: '2999999',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }, {
    product_name: 'Iphone',
    product_description: 'Iphone versi 2020',
    quantity: '3333',
    product_price: '7000000',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Products', null, { truncate: true, restartIdentity: true }),
};