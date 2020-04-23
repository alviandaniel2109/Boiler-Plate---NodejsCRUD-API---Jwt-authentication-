import db from '../../../config/sequelize';

const { Admin, Role } = db;
const { check } = require('express-validator');

const validate = (method) => {
    switch (method) {
    case 'create': {
        return [
            check('role_id').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.role_id'),
                }))
                .bail()
                .isNumeric()
                .withMessage((value, { req }) => req.t('validation.is_numeric', {
                    variable: req.t('variable.role_id'),
                }))
                .bail()
                .custom((value, { req }) => Role
                    .findByPk(req.body.role_id).then((role) => {
                        if (!role) {
                            throw new Error(req.t('validation.not_found', {
                                variable: req.t('variable.role'),
                            }));
                        }
                        return value;
                    })),
            check('username').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.username'),
                }))
                .bail()
                .custom((value, { req }) => Admin
                    .findOne({
                        where: {
                            username: req.body.username,
                        },
                    }).then((admin) => {
                        if (admin) {
                            throw new Error(req.t('validation.exist', {
                                variable: req.t('variable.admin'),
                                key: req.t('variable.username'),
                                value,
                            }));
                        }
                        return value;
                    })),
            check('email').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.email'),
                }))
                .bail()
                .isEmail()
                .withMessage((value, { req }) => req.t('validation.is_email', {
                    variable: req.t('variable.email'),
                }))
                .bail()
                .custom((value, { req }) => Admin
                    .findOne({
                        where: {
                            email: req.body.email,
                        },
                    }).then((admin) => {
                        if (admin) {
                            throw new Error(req.t('validation.exist', {
                                variable: req.t('variable.admin'),
                                key: req.t('variable.email'),
                                value,
                            }));
                        }
                        return value;
                    })),
            check('password_confirmation').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.password_confirmation'),
                }))
                .bail()
                .custom((value, { req }) => {
                    if (value !== req.body.password) {
                        throw new Error(req.t('validation.password_matching'));
                    }
                    return value;
                }),
            check('password').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.password'),
                }))
                .bail()
                .custom((value, { req }) => {
                    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/g.test(req.body.password)) {
                        throw new Error(req.t('validation.password_format'));
                    }
                    return value;
                }),
        ];
    }
    case 'update': {
        return [
            check('role_id').optional().not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.role_id'),
                }))
                .bail()
                .isNumeric()
                .withMessage((value, { req }) => req.t('validation.is_numeric', {
                    variable: req.t('variable.role_id'),
                }))
                .bail()
                .custom((value, { req }) => Role
                    .findByPk(req.body.role_id).then((role) => {
                        if (!role) {
                            throw new Error(req.t('validation.not_found', {
                                variable: req.t('variable.role'),
                            }));
                        }
                        return value;
                    })),
            check('active').optional().not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.active'),
                }))
                .bail()
                .isBoolean()
                .withMessage((value, { req }) => req.t('validation.is_boolean', {
                    variable: req.t('variable.active'),
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
