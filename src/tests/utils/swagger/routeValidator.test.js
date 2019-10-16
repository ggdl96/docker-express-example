const routeValidator = require('../../../utils/swagger/routeValidator');

describe('Route Validator tests', function () {
    function getDefaultRequest(
        originalUrl = 'some-url',
        method = 'GET',
        headers = {contentType: 'application/json'}
    ) {
        return { originalUrl, method, headers };
    }

    describe('Success', function () {
        it('should return true if all validation pass', function () {
            expect(routeValidator({ 'some-url': { get: {} } }, getDefaultRequest())).toEqual(true);
        });

        it('should return true if all validation pass', function () {
            const routes = {
                'some-url': { get: {} },
                'some-url/other': { put: {} },
            };
            expect(routeValidator(routes, getDefaultRequest())).toEqual(true);
        });
    });

    describe('Validations', function () {
        it('should throw exception if not parameters provided', function () {
            expect(() => routeValidator()).toThrowError('Both routes and req are required');
        });

        it('should throw exception if routes are string', function () {
            expect(() => routeValidator('', getDefaultRequest()))
                .toThrowError('Both routes and req are required');
        });

        it('should throw exception if routes are string', function () {
            expect(() => routeValidator('some route', getDefaultRequest()))
                .toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are empty object', function () {
            expect(() => routeValidator({}, getDefaultRequest()))
                .toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are array', function () {
            expect(() => routeValidator([], getDefaultRequest()))
                .toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are array', function () {
            expect(() => routeValidator(['some-route'], getDefaultRequest()))
                .toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are boolean', function () {
            expect(() => routeValidator(true, getDefaultRequest()))
                .toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are integer', function () {
            expect(() => routeValidator(212, getDefaultRequest()))
                .toThrowError('routes param is not valid');
        });

        it('should throw exception if req is not valid', function () {
            expect(() => routeValidator({ 'some-url': {} }, {}))
                .toThrowError('Both routes and req are required');
        });

        it('should throw exception if req method is not valid', function () {
            expect(() => routeValidator({ 'some-url': {} }, getDefaultRequest('some-url', 'xsd')))
                .toThrowError('Request Method: xsd is not valid');
        });

        it('should throw exception if req method is not allowed', function () {
            expect(() => routeValidator({ 'some-url': {post: {}} }, getDefaultRequest()))
                .toThrowError('Request Method: GET is not allowed');
        });
    });
});