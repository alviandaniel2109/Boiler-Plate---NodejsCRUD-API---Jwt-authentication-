import db from '../../../config/sequelize';

const { Product } = db;
const { check } = require('express-validator');

const validate = (method) => {
    switch (method) {
    case 'create': {
        return [
            check('product_name').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.product_name'),
                }))
                .bail()
                .custom((value, { req }) => Product
                    .findOne({
                        where: {
                            product_name: req.body.product_name,
                        },
                    }).then((product) => {
                        if (product) {
                            throw new Error(req.t('validation.exist', {
                                variable: req.t('variable.product'),
                                key: req.t('variable.product_name'),
                                value,
                            }));
                        }
                        return value;
                    })),
            check('product_description').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.product_description'),
                }))
                .bail()
                .custom((value, { req }) => Product
                    .findOne({
                        where: {
                            product_description: req.body.product_description,
                        },
                    }).then((product) => {
                        if (product) {
                            throw new Error(req.t('validation.exist', {
                                variable: req.t('variable.product'),
                                key: req.t('variable.product_description'),
                                value,
                            }));
                        }
                        return value;
                    })),
            check('quantity').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.quantity'),
                }))
                .bail()
                .custom((value, { req }) => Product
                    .findOne({
                        where: {
                            quantity: req.body.quantity,
                        },
                    }).then((product) => {
                        if (product) {
                            throw new Error(req.t('validation.exist', {
                                variable: req.t('variable.product'),
                                key: req.t('variable.quantity'),
                                value,
                            }));
                        }
                        return value;
                    })),

                check('product_price').not().isEmpty()
                    .withMessage((value, { req }) => req.t('validation.not_empty', {
                        variable: req.t('variable.product_price'),
                    }))
                    .bail()
                    .custom((value, { req }) => Product
                        .findOne({
                            where: {
                                product_price: req.body.product_price,
                            },
                        }).then((product) => {
                            if (product) {
                                throw new Error(req.t('validation.exist', {
                                    variable: req.t('variable.product'),
                                    key: req.t('variable.product_price'),
                                    value,
                                }));
                            }
                            return value;
                        })),
        ];
    }
    case 'update': {
        return [
            // check('product_name').optional().not().isEmpty()
            //     .withMessage((value, { req }) => req.t('validation.not_empty', {
            //         variable: req.t('variable.product_name'),
            //     }))
            //     .bail()
            //     .custom((value, { req }) => Product
            //         .findOne({
            //             where: {
            //                 id: {
            //                     [Sequelize.Op.ne]: parseInt(req.params.id, 10),
            //                 },
            //                 product_name: {
            //                     [Sequelize.Op.iLike]: req.body.product_name,
            //                 },
            //             },
            //         }).then((product) => {
            //             if (product) {
            //                 throw new Error(req.t('validation.exist', {
            //                     variable: req.t('variable.product'),
            //                     key: req.t('variable.product_name'),
            //                     value,
            //                 }));
            //             }
            //             return value;
            //         })),
        ];
    }
    default: {
        return [];
    }
    }
};

module.exports = {
    validate,
};
