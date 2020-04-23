/* eslint-env jest */

import app from '../../../index';
import '@babel/polyfill';

const request = require('supertest');
const httpStatus = require('http-status');

const config = require('../../../config/config').default;

const apiVersionPath = `/api/v${config.apiVersion}`;
describe('## Model APIs', () => {
    let id;
    let token;
    const model = {
        name: 'test',
    };
    const newModel = {
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

    describe(`# GET ${apiVersionPath}/admin-cms/model`, () => {
        test('should return all models', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/model`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    expect(Array.isArray(res.body.result.models.rows)).toBe(true);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# POST ${apiVersionPath}/admin-cms/model`, () => {
        test('should fail to create a model caused by unauthorized', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/model`)
                .send({
                    name: model.name,
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should fail to create a model caused by missing name', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/model`)
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

        test('should create a model', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/model`)
                .set('Authorization', token)
                .send({
                    name: model.name,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    id = res.body.result.id;
                    done();
                })
                .catch(done);
        });

        test('should fail to create a model caused by name exists', (done) => {
            request(app)
                .post(`${apiVersionPath}/admin-cms/model`)
                .set('Authorization', token)
                .send({
                    name: model.name,
                })
                .expect(httpStatus.UNPROCESSABLE_ENTITY)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# GET ${apiVersionPath}/admin-cms/model/:id`, () => {
        test('should get a model', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/model/${id}`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to get a model caused by model not found', (done) => {
            request(app)
                .get(`${apiVersionPath}/admin-cms/model/0`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# PUT ${apiVersionPath}/admin-cms/model/:id`, () => {
        test('should fail to update a model caused by unauthorized', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/model/${id}`)
                .send({
                    name: model.name,
                })
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a model caused by missing name', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/model/${id}`)
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

        test('should update a model', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/model/${id}`)
                .set('Authorization', token)
                .send({
                    name: newModel.name,
                })
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to update a model caused by name exists', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/model/${id}`)
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

        test('should fail to update a model caused by model not found', (done) => {
            request(app)
                .put(`${apiVersionPath}/admin-cms/model/0`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });

    describe(`# DELETE ${apiVersionPath}/admin-cms/model/:id`, () => {
        test('should fail to delete a model caused by unauthorized', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/model/${id}`)
                .expect(httpStatus.UNAUTHORIZED)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.UNAUTHORIZED);
                    done();
                })
                .catch(done);
        });

        test('should delete a model', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/model/${id}`)
                .set('Authorization', token)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.OK);
                    done();
                })
                .catch(done);
        });

        test('should fail to delete a model caused by model not found', (done) => {
            request(app)
                .delete(`${apiVersionPath}/admin-cms/model/0`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });
});
