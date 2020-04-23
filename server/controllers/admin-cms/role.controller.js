import db from '../../../config/sequelize';

const { Role } = db;
const { setContent, getContentSuccess, getContentFail } = require('../../response/response');
const { simpleOrdering, simplePagination } = require('../../misc/misc');

const create = (req, res) => Role.create({
    name: req.body.name,
}, {
    decoded: req.decoded,
}).then((role) => {
    setContent(200, { id: role.id });
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

const get = (req, res) => {
    setContent(200, { role: req.role });
    return res.status(200).json(getContentSuccess());
};

const list = (req, res) => {
    const ordering = simpleOrdering(req);
    const pagination = simplePagination(req);

    const option = {
        attributes: [
            'id',
            'name',
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

    Role
        .findAndCountAll(option)
        .then((roles) => {
            setContent(200, { roles });
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
};

const load = (req, res, next, id) => Role
    .findByPk(id, {
        attributes: ['id', 'name'],
    })
    .then((role) => {
        if (!role) {
            const error = {
                message: req.t('error.not_found', {
                    variable: req.t('variable.role'),
                }),
            };
            setContent(404, error);
            return res.status(404).json(getContentFail(error));
        }
        req.role = role;
        return next();
    })
    .catch((e) => {
        setContent(400, e);
        return res.status(400).json(getContentFail(e));
    });

const remove = (req, res) => req.role.destroy({
    decoded: req.decoded,
}).then(() => {
    setContent(200);
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

const update = (req, res) => req.role.update(req.body, {
    decoded: req.decoded,
    previous: req.role.dataValues,
    newValue: req.body,
}).then(() => {
    setContent(200);
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

export default {
    create,
    get,
    list,
    load,
    remove,
    update,
};
