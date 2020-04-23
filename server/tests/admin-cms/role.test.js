/* eslint-env jest */

import app from '../../../index';
import '@babel/polyfill';

const request = require('supertest');
const httpStatus = require('http-status');

const config = require('../../../config/config').default;

const apiVersionPath = `/api/v${config.apiVersion}`;
describe('## Role APIs', () => {
    let id;
    let token;
    const role = {
        name: 'test',
    };
    const newRole = {
        name: 'test2',
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

    describe(`# GET ${apiVersionPath}/admin-cms/role`, () => {
        test('should return all roles', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/role`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    expect(Array.isArray(res.body.result.roles.rows)).toBe(true);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# POST ${apiVersionPath}/admin-cms/role`, () => {
        test('should fail to create a role caused by unauthorized', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/role`)
                .send({
                    name: role.name,
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should fail to create a role caused by missing name', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/role`)
                .set('Authorization', token)
                .send({
                    name: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should create a role', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/role`)
                .set('Authorization', token)
                .send({
                    name: role.name,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    id = res.body.result.id;
                    done();
                })
                .catch(done);
        });

        test('should fail to create a role caused by name exists', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/role`)
                .set('Authorization', token)
                .send({
                    name: role.name,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# GET ${apiVersionPath}/admin-cms/role/:id`, () => {
        test('should get a role', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/role/${id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to get a role caused by role not found', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/role/0`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# PUT ${apiVersionPath}/admin-cms/role/:id`, () => {
        test('should fail to update a role caused by unauthorized', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/role/${id}`)
                .send({
                    name: role.name,
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a role caused by missing name', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/role/${id}`)
                .set('Authorization', token)
                .send({
                    name: '',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should update a role', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/role/${id}`)
                .set('Authorization', token)
                .send({
                    name: newRole.name,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a role caused by name exists', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/role/${id}`)
                .set('Authorization', token)
                .send({
                    name: 'Admin',
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a role caused by role not found', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/role/0`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# DELETE ${apiVersionPath}/admin-cms/role/:id`, () => {
        test('should fail to delete a role caused by unauthorized', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/role/${id}`)
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should delete a role', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/role/${id}`)
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete a role caused by role not found', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/role/0`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });
});
