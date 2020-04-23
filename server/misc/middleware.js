const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { setContent, getContentFail } = require('../response/response');
const config = require('../../config/config').default;

const checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers.authorization;
    if (token && token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (!token) {
        const error = { message: 'Authorization needed' };
        setContent(401, error);
        return res.status(401).json(getContentFail(error));
    }

    return jwt.verify(token, config.jwtSecret, (err, decoded) => {
        if (err) {
            const error = { message: 'Unauthorized request' };
            setContent(401, error);
            return res.status(401).json(getContentFail(error));
        }
        req.decoded = decoded;
        return next();
    });
};

const checkUserType = (req, res, next, types) => {
    if (!types.includes((req.decoded.role_id))) {
        const error = { message: 'Unauthorized Request' };
        setContent(401, error);
        return res.status(401).json(getContentFail(error));
    }
    return next();
};

const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = [];
        errors.errors.forEach((error) => {
            errorMessage.push(error.msg);
        });
        setContent(422, { message: errorMessage });
        return res.status(422).json(getContentFail(`(Validation) ${errorMessage}`));
    }

    return next();
};

module.exports = {
    checkToken,
    checkUserType,
    checkValidation,
};
