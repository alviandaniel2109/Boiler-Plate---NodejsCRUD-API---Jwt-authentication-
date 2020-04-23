const { check } = require('express-validator');

const validate = (method) => {
    switch (method) {
    case 'login': {
        return [
            check('email').not().isEmpty()
                .withMessage((value, { req }) => req.t('validation.not_empty', {
                    variable: req.t('variable.email'),
                }))
                .bail()
                .isEmail()
                .withMessage((value, { req }) => req.t('validation.is_email', {
                    variable: req.t('variable.email'),
                })),
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
    default: {
        return [];
    }
    }
};

module.exports = {
    validate,
};
