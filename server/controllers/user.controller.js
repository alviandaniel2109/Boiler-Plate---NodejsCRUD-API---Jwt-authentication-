import db from '../../config/sequelize';

const { User } = db;
const { check, validationResult } = require('express-validator');
const { setContent, getContentSuccess, getContentFail } = require('../response/response');
const { simpleOrdering, simplePagination } = require('../misc/misc');

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
    User.findByPk(id)
        .then((user) => {
            if (!user) {
                const error = { message: 'User does not exist' };
                setContent(404, error);
                return res.status(404).json(getContentFail(error));
            }
            req.user = user;
            return next();
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
    setContent(200, req.user);
    return res.status(200).json(getContentSuccess());
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
const create = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = [];
        errors.errors.forEach((error) => {
            errorMessage.push(error.msg);
        });
        setContent(422, { message: errorMessage });
        return res.status(422).json(getContentSuccess());
    }
    return User.create(req.body)
        .then((user) => {
            setContent(200, user);
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
};

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @returns {User}
 */
function update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = [];
        errors.errors.forEach((error) => {
            errorMessage.push(error.msg);
        });
        setContent(422, { message: errorMessage });
        return res.status(422).json(getContentSuccess());
    }
    return req.user.update(req.body)
        .then(() => {
            const message = { message: 'User successfully updated' };
            setContent(200, message);
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res) {
    const ordering = simpleOrdering(req);
    const pagination = simplePagination(req);
    User
        .scope([
            { method: ['ordering', ordering] },
            { method: ['pagination', req.query.pagination, pagination] },
        ])
        .findAll()
        .then((users) => {
            if (!users) {
                const error = { message: 'User does not exist' };
                setContent(404, error);
                return res.status(404).json(getContentFail(error));
            }
            setContent(200, users);
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res) {
    const { user } = req;
    user.destroy()
        .then(() => {
            const message = { message: 'User successfully deleted' };
            setContent(200, message);
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
}

/**
 * Validate user and append to req.
 */
function validate(method) {
    switch (method) {
    case 'createUser': {
        return [
            check('username', 'username must be alphanumeric').isAlphanumeric(),
            check('username', 'username is required').not().isEmpty(),
            check('username').custom((value) => User.findOne({
                where: {
                    username: value,
                },
            }).then((user) => {
                if (user) {
                    return Promise.reject(new Error('username already in use'));
                }
                return Promise.resolve();
            })),
        ];
    }
    default: {
        return [];
    }
    }
}

export default {
    load,
    get,
    create,
    update,
    list,
    remove,
    validate,
};
