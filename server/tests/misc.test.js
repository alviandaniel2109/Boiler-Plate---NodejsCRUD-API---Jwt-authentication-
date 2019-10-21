/* eslint-env jest */

import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import app from '../../index';
import config from '../../config/config';
import '@babel/polyfill';

const apiVersionPath = `/api/v${config.apiVersion}`;

describe('## Misc', () => {
    describe(`# GET ${apiVersionPath}/health-check`, () => {
        test('should return OK', (done) => {
            request(app)
                .get(`${apiVersionPath}/health-check`)
                .expect(httpStatus.OK)
                .then((res) => {
                    expect(res.text).toEqual('OK');
                    done();
                })
                .catch(done);
        });
    });

    describe(`# GET ${apiVersionPath}/404`, () => {
        test('should return 404 status', (done) => {
            request(app)
                .get(`${apiVersionPath}/404`)
                .expect(httpStatus.NOT_FOUND)
                .then((res) => {
                    expect(res.body.response).toEqual(httpStatus.NOT_FOUND);
                    done();
                })
                .catch(done);
        });
    });
});
