/* eslint-env jest */

import db from '../../../config/sequelize';
import app from '../../../index';
import '@babel/polyfill';

const request = require('supertest');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { Admin } = db;
const config = require('../../../config/config').default;

const apiVersionPath = `/api/v${config.apiVersion}`;
describe('## Auth APIs', () => {
    let id;
    const email = 'superadmin@liniads.com';
    const password = 'Superadmin@liniads2020';
    const invalidAdminCredentials = {
        email,
        password: bcrypt.hashSync('123123123', 10),
    };

    afterAll(async () => {
        await Admin.destroy({ where: { id: [id] } });
        db.sequelize.close();
    });

    describe(`# POST ${apiVersionPath}/admin-cms/auth/login`, () => {
        test('should return Authentication error', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/auth/login`)
                .send({
                    email: '',
                    password: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should return Authentication error', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/auth/login`)
                .send(invalidAdminCredentials)
                .expect(httpStatus.BAD_REQUEST)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.BAD_REQUEST);
                    done();
                })
                .catch(done);
        });

        test('should get valid JWT token', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/auth/login`)
                .send({
                    email,
                    password,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.result).toHaveProperty('token');
                    jwt.verify(res.body.result.token, config.jwtSecret, (err, decoded) => {
                        expect(!err);
                        expect(decoded.email).toEqual(email);
                        done();
                    });
                })
                .catch(done);
        });
    });
});
