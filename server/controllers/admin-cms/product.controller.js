import db from '../../../config/sequelize';

const { Product } = db;
const { setContent, getContentSuccess, getContentFail } = require('../../response/response');
const { simpleOrdering, simplePagination } = require('../../misc/misc');

const create = (req, res) => Product.create({
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    quantity: req.body.quantity,
    product_price: req.body.product_price
}, {
    decoded: req.decoded,
}).then((product) => {
    setContent(200, { id: product.id });
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

const get = (req, res) => {
    setContent(200, { product: req.product });
    return res.status(200).json(getContentSuccess());
};

const list = (req, res) => {
    const ordering = simpleOrdering(req);
    const pagination = simplePagination(req);

    const option = {
        attributes: [
            'id',
            'product_name',
            'product_description',
            'quantity',
            'product_price'
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

    Product
        .findAndCountAll(option)
        .then((products) => {
            setContent(200, { products });
            return res.status(200).json(getContentSuccess());
        })
        .catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(e));
        });
};

const load = (req, res, next, id) => Product
    .findByPk(id, {
        attributes: ['id', 'product_name', 'product_description', 'quantity', 'product_price'],
    })
    .then((product) => {
        if (!product) {
            const error = {
                message: req.t('error.not_found', {
                    variable: req.t('variable.product'),
                }),
            };
            setContent(404, error);
            return res.status(404).json(getContentFail(error));
        }
        req.product = product;
        return next();
    })
    .catch((e) => {
        setContent(400, e);
        return res.status(400).json(getContentFail(e));
    });

const remove = (req, res) => req.product.destroy({
    decoded: req.decoded,
}).then(() => {
    setContent(200);
    return res.status(200).json(getContentSuccess());
}).catch((e) => {
    setContent(400, e);
    return res.status(400).json(getContentFail(e));
});

const update = (req, res) => req.product.update(req.body, {
    decoded: req.decoded,
    previous: req.product.dataValues,
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
