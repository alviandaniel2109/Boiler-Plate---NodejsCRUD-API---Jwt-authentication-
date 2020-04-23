import express from 'express';
import authCtrl from '../../controllers/admin-cms/auth.controller';
import authValidation from '../../validation/admin-cms/auth.validation';

const middleware = require('../../misc/middleware');

const router = express.Router();

router.route('/login')
    .post([
        authValidation.validate('login'),
        middleware.checkValidation,
        authCtrl.login,
    ]);

export default router;
