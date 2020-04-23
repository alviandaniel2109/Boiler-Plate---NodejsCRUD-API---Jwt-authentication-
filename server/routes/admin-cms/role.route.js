import express from 'express';
import roleCtrl from '../../controllers/admin-cms/role.controller';
import roleValidation from '../../validation/admin-cms/role.validation';

const middleware = require('../../misc/middleware');

const router = express.Router();

router.route('/')
    .get(roleCtrl.list)
    .post([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        roleValidation.validate('create'),
        middleware.checkValidation,
        roleCtrl.create,
    ]);

router.route('/:id')
    .get(roleCtrl.get)
    .put([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        roleValidation.validate('update'),
        middleware.checkValidation,
        roleCtrl.update,
    ])
    .delete([
        middleware.checkToken,
        (req, res, next) => middleware.checkUserType(req, res, next, [1]),
        roleCtrl.remove,
    ]);

router.param('id', roleCtrl.load);

export default router;
