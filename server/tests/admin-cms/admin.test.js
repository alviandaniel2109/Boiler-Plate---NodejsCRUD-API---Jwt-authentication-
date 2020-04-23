/* eslint-env jest */

import app from '../../../index';
import '@babel/polyfill';

const request = require('supertest');
const httpStatus = require('http-status');

const config = require('../../../config/config').default;

const apiVersionPath = `/api/v${config.apiVersion}`;
describe('## Admin APIs', () => {
    let id;
    let token;
    const admin = {
        role_id: 1,
        username: 'username',
        email: 'email@mail.com',
        password: 'Password@123',
        password_confirmation: 'Password@123',
    };
    const newAdmin = {
        role_id: 1,
        active: false,
    };

    describe(`# POST ${apiVersionPath}/admin-cms/auth/login`, () => {
        test('should authenticate an superadmin', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/auth/login`)
                .send({
                    email: 'superadmin@liniads.com',
                    password: 'Superadmin@liniads2020',
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    token = res.body.result.token;
                    done();
                })
                .catch(done);
        });
    });

    describe(`# GET ${apiVersionPath}/admin-cms/admin`, () => {
        test('should return all admins', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/admin`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    expect(Array.isArray(res.body.result.admins.rows)).toBe(true);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# POST ${apiVersionPath}/admin-cms/admin`, () => {
        test('should fail to create an admin caused by unauthorized', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by missing role_id', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: '',
                    email: admin.email,
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by missing email', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: '',
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by missing username', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: '',
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by missing password', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: admin.username,
                    password: '',
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by missing password', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should create an admin', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    id = res.body.result.id;
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by email exists', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: 'superadmin@liniads.com',
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by username exists', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: 'Superadmin',
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by wrong role_id format', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: 'a',
                    email: admin.email,
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by wrong email format', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: 'test',
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by wrong password format', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: admin.username,
                    password: 'test',
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by password does not match with password confirmation', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: admin.role_id,
                    email: admin.email,
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: 'Password@123123',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to create an admin caused by role_id not found', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/admin`)
                .set('Authorization', token)
                .send({
                    role_id: 0,
                    email: admin.email,
                    username: admin.username,
                    password: admin.password,
                    password_confirmation: admin.password_confirmation,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# GET ${apiVersionPath}/admin-cms/admin/:id`, () => {
        test('should get an admin', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/admin/${id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to get an admin caused by admin not found', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/admin/0`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# PUT ${apiVersionPath}/admin-cms/admin/:id`, () => {
        test('should fail to update an admin caused by unauthorized', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/admin/${id}`)
                .send({
                    role_id: newAdmin.role_id,
                    active: newAdmin.active,
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should fail to update an admin caused by missing role_id', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/admin/${id}`)
                .set('Authorization', token)
                .send({
                    role_id: '',
                    active: newAdmin.active,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to update an admin caused by missing active', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/admin/${id}`)
                .set('Authorization', token)
                .send({
                    role_id: newAdmin.role_id,
                    active: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should update an admin', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/admin/${id}`)
                .set('Authorization', token)
                .send({
                    role_id: newAdmin.role_id,
                    active: newAdmin.active,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to update an admin caused by wrong role_id format', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/admin/${id}`)
                .set('Authorization', token)
                .send({
                    role_id: 'a',
                    active: newAdmin.active,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to update an admin caused by wrong active format', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/admin/${id}`)
                .set('Authorization', token)
                .send({
                    role_id: newAdmin.role_id,
                    active: 'test',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to update an admin caused by role_id does not exist', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/admin/${id}`)
                .set('Authorization', token)
                .send({
                    role_id: 0,
                    active: newAdmin.active,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# DELETE ${apiVersionPath}/admin-cms/admin/:id`, () => {
        test('should fail to delete an admin caused by unauthorized', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/admin/${id}`)
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should delete an admin', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/admin/${id}`)
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete an admin caused by admin not found', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/admin/0`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });
});
