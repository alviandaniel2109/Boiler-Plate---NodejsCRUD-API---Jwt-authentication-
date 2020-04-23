import express from 'express';
import adminCtrl from '../../controllers/admin-cms/admin.controller';
import adminValidation from '../../validation/admin-cms/admin.validation';

const middleware = require('../../misc/middleware');

const router = express.Router();

router.route('/')
    .get(adminCtrl.list)
    .post([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        adminValidation.validate('create'),
        middleware.checkValidation,
        adminCtrl.create,
    ]);

router.route('/:id')
    .get(adminCtrl.get)
    .put([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        adminValidation.validate('update'),
        middleware.checkValidation,
        adminCtrl.update,
    ])
    .delete([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        adminCtrl.remove,
    ]);

router.param('id', adminCtrl.load);

export default router;
