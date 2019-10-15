const routeValidator = require('../../../utils/swagger/routeValidator');

describe('Route Validator tests', function () {
    describe('Success', function () {
        function getDefaultRequest(originalUrl = 'some-url', method = 'GET') {
            return { originalUrl, method };
        }

        it('should return true if all validation pass', function () {
            expect(routeValidator({ 'some-url': { get: {} } }, getDefaultRequest())).toEqual(true);
        });
    });

    describe('Validations', function () {
        function getDefaultRequest(originalUrl = 'some-url', method = 'GET') {
            return { originalUrl, method };
        }

        it('should throw exception if not parameters provided', function () {
            expect(() => routeValidator()).toThrowError('Both routes and req are required');
        });

        it('should throw exception if routes are string', function () {
            expect(() => routeValidator('', getDefaultRequest())).toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are string', function () {
            expect(() => routeValidator('some route', getDefaultRequest())).toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are empty object', function () {
            expect(() => routeValidator({}, getDefaultRequest())).toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are array', function () {
            expect(() => routeValidator([], getDefaultRequest())).toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are array', function () {
            expect(() => routeValidator(['some-route'], getDefaultRequest())).toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are boolean', function () {
            expect(() => routeValidator(true, getDefaultRequest())).toThrowError('routes param is not valid');
        });

        it('should throw exception if routes are integer', function () {
            expect(() => routeValidator(212, getDefaultRequest())).toThrowError('routes param is not valid');
        });

        it('should throw exception if req is not valid', function () {
            expect(() => routeValidator({ 'some-url': {} }, {})).toThrowError('Requested URL was not found');
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