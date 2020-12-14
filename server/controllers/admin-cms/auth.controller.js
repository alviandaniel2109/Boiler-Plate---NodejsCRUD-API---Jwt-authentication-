import db from '../../../config/sequelize';

const { Admin, Model, Role, } = db;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('../../../config/config');
const { setContent, getContentSuccess, getContentFail } = require('../../response/response');


const login = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    return Admin.findOne({
        include: [{
            model: Role,
            as: 'role',
            attributes: [],
        }],
        where: {
            [Sequelize.Op.or]: [{
                email,
            }],
            active: true,
        },
        
        attributes: [
            'id',
            'email',
            'username',
            'role_id',
            'password',
            [Sequelize.literal('role.name'), 'role_name'],
            'active',
        ],
        raw: true,
    }).then((admin) => {
        console.log(admin);
        if (!admin || !bcrypt.compareSync(password, admin.password)) {
            const error = {
                message: req.t('error.incorrect', {
                    variable: req.t('array.email_password', { joinArrays: ` ${req.t('misc.or')} ` }),
                }),
            };
            setContent(400, error);
            return res.status(400).json(getContentFail(error.message));
            
        }
        return Model.findOne({
            where: {
                name: 'admin',
            },
        }).then((model) => {
            console.log('model');
            const token = jwt.sign({
                email: admin.email,
                user_id: admin.id,
                username: admin.username,
                role_id: admin.role_id,
                role_name: admin.role_name,
                model_id: model.id,
            }, config.default.jwtSecret, { expiresIn: '24h' });

            setContent(200, { token });
            return res.status(200).json(getContentSuccess());
        }).catch((e) => {
            setContent(400, e);
            return res.status(400).json(getContentFail(`Data Error: ${e.message}`));
        });
        
    }).catch((e) => {
        setContent(400, e);
        return res.status(400).json(getContentFail(`Data Error: ${e.message}`));
        
    });
};

module.exports = {
    login,
};
