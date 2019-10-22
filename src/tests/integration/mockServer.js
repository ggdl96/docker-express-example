const supertest = require('supertest');

const app = require('../../app');

beforeAll(function () {
    /*app.on('ready', async () => {
        done();
    });*/
});

const mockServer = supertest(app);

module.exports = mockServer;