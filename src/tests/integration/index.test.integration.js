const request = require('./mockServer');

describe('integration test', function () {
    it('should execute if integration', async function () {
        const response = await request.post('/v1/auth/login');
        expect(response);
    });
});
