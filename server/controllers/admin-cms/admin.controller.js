import db from '../../../config/sequelize';

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const { Admin, Role } = db;
const { setContent, getContentSuccess, getContentFail } = require('../../response/response');
const { simpleOrdering, simplePagination } = require('../../misc/misc');

const create = (req, res) => Admin.create({
    role_id: req.body.role_id,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
}, {
    decoded: req.decoded,
}).then((admin) => {
    setContent(200, { id: admin.id });
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

const get = (req, res) => {
    setContent(200, { admin: req.admin });
    return res.status(200).json(getContentSuccess());
};

const list = (req, res) => {
    const ordering = simpleOrdering(req);
    const pagination = simplePagination(req);

    const option = {
        include: [{
            model: Role,
            as: 'role',
            attributes: [],
        }],
        attributes: [
            'id',
            'email',
            'username',
            [Sequelize.literal('role.name'), 'role_name'],
            'active',
        ],
        order: [
            [ordering.orderBy, ordering.orderType],
        ],
    };

    if (req.query.pagination !== 'false') {
        Object.assign(option, {
            offset: pagination.page,
            limit: pagination.row,
        });
    }

    Admin
        .findAndCountAll(option)
        .then((admins) => {
            setContent(200, { admins });
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
};

const load = (req, res, next, id) => Admin
    .findByPk(id, {
        include: [{
            model: Role,
            as: 'role',
            attributes: [],
        }],
        attributes: [
            'id',
            'role_id',
            'email',
            'username',
            [Sequelize.literal('role.name'), 'role_name'],
            'active',
        ],
    })
    .then((admin) => {
        if (!admin) {
            const error = {
                message: req.t('error.not_found', {
                    variable: req.t('variable.admin'),
                }),
            };
            setContent(404, error);
            return res.status(404).json(getContentFail(error));
        }
        req.admin = admin;
        return next();
    })
    .catch((e) => {
        setContent(400, e);
        return res.status(400).json(getContentFail(e));
    });

const remove = (req, res) => req.admin.destroy({
    decoded: req.decoded,
}).then(() => {
    setContent(200);
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

const update = (req, res) => {
    req.body.role_id = parseInt(req.body.role_id, 10);
    return req.admin.update(req.body, {
        decoded: req.decoded,
        previous: req.admin.dataValues,
        newValue: req.body,
    }).then(() => {
        setContent(200);
        return res.status(200).json(getContentSuccess());
    }).catch((e) => {
        setContent(400, e);
        return res.status(400).json(getContentFail(e));
    });
};

export default {
    create,
    get,
    list,
    load,
    remove,
    update,
};
