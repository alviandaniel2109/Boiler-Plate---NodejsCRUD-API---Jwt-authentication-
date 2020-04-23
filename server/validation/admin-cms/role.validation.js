import db from '../../../config/sequelize';

const { Role } = db;
const { check } = require('express-validator');
const Sequelize = require('sequelize');

const validate = (method) => {
    switch (method) {
    case 'create': {
        return [
            check('name').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.name'),
                }))
                .bail()
                .custom((value, { req }) => Role
                    .findOne({
                        where: {
                            name: {
                                [Sequelize.Op.iLike]: req.body.name,
                            },
                        },
                    }).then((role) => {
                        if (role) {
                            throw new Error(req.t('validation.exist', {
                                variable: req.t('variable.role'),
                                key: req.t('variable.name'),
                                value,
                            }));
                        }
                        return value;
                    })),
        ];
    }
    case 'update': {
        return [
            check('name').optional().not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.name'),
                }))
                .bail()
                .custom((value, { req }) => Role
                    .findOne({
                        where: {
                            id: {
                                [Sequelize.Op.ne]: parseInt(req.params.id, 10),
                            },
                            name: {
                                [Sequelize.Op.iLike]: req.body.name,
                            },
                        },
                    }).then((role) => {
                        if (role) {
                            throw new Error(req.t('validation.exist', {
                                variable: req.t('variable.role'),
                                key: req.t('variable.name'),
                                value,
                            }));
                        }
                        return value;
                    })),
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
