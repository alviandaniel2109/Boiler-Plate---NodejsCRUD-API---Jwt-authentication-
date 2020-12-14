import express from 'express';
import productCtrl from '../../controllers/admin-cms/product.controller';
import productValidation from '../../validation/admin-cms/product.validation';

const middleware = require('../../misc/middleware');

const router = express.Router();

router.route('/')
    .get(productCtrl.list)
    .post([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        productValidation.validate('create'),
        middleware.checkValidation,
        productCtrl.create,
    ]);

router.route('/:id')
    .get(productCtrl.get)
    .put([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        productValidation.validate('update'),
        middleware.checkValidation,
        productCtrl.update,
    ])
    .delete([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        productCtrl.remove,
    ]);

router.param('id', productCtrl.load);

export default router;
