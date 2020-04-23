import db from '../../../config/sequelize';

const { Model } = db;
const { setContent, getContentSuccess, getContentFail } = require('../../response/response');
const { simpleOrdering, simplePagination } = require('../../misc/misc');

const create = (req, res) => Model.create({
    name: req.body.name,
}).then((model) => {
    setContent(200, { id: model.id });
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

const get = (req, res) => {
    setContent(200, { model: req.model });
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

    Model
        .findAndCountAll(option)
        .then((models) => {
            setContent(200, { models });
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
};

const load = (req, res, next, id) => Model
    .findByPk(id, {
        attributes: ['id', 'name'],
    })
    .then((model) => {
        if (!model) {
            const error = {
                message: req.t('error.not_found', {
                    variable: req.t('variable.model'),
                }),
            };
            setContent(404, error);
            return res.status(404).json(getContentFail(error));
        }
        req.model = model;
        return next();
    })
    .catch((e) => {
        setContent(400, e);
        return res.status(400).json(getContentFail(e));
    });

const remove = (req, res) => req.model.destroy().then(() => {
    setContent(200);
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

const update = (req, res) => req.model.update(req.body).then(() => {
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
