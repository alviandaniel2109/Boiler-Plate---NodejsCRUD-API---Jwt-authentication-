import express from 'express';
import modelCtrl from '../../controllers/admin-cms/model.controller';
import modelValidation from '../../validation/admin-cms/model.validation';

const middleware = require('../../misc/middleware');

const router = express.Router();

router.route('/')
    .get(modelCtrl.list)
    .post([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        modelValidation.validate('create'),
        middleware.checkValidation,
        modelCtrl.create,
    ]);

router.route('/:id')
    .get(modelCtrl.get)
    .put([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        modelValidation.validate('update'),
        middleware.checkValidation,
        modelCtrl.update,
    ])
    .delete([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        modelCtrl.remove,
    ]);

router.param('id', modelCtrl.load);

export default router;
