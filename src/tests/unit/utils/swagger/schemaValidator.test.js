const schemaValidator = require('../../../../utils/swagger/schemaValidator');

describe('Route Validator tests', function () {
    function getDefaultRequest(
        originalUrl = 'some-url',
        method = 'POST',
        headers = {contentType: 'application/json'},
        body = { email: 'pepe@gmail.com', password: '12345678' }
    ) {
        return { originalUrl, method, headers, body };
    }

    describe('Success', function () {
        it('should return empty array if all validation pass', function () {
            const errors = schemaValidator({
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        maxLength: 150
                    },
                    password: {
                        type: 'string',
                        minLength: 8,
                        maxLength: 50,
                    },
                },
                required: [
                    'email', 'password'
                ]
            }, getDefaultRequest().body);

            expect(errors.length).toEqual(0);
        });
    });

    describe('Validations', function () {
        it('should throw exception if not parameters provided', function () {
            expect(() => schemaValidator()).toThrowError('Both schema and body are required');
        });

        it('should return array of validations not passed', function () {
            const expectedErrors = ['email', 'password'];
            const errors = schemaValidator({
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        maxLength: 150
                    },
                    password: {
                        type: 'string',
                        minLength: 8,
                        maxLength: 50,
                    },
                },
                required: [
                    'email', 'password'
                ]
            }, {});

            errors.sort().map((error, index) => expect(error).toEqual(expectedErrors[index]));
        });

        it('should return array of validations not passed', function () {
            const expectedErrors = [{ password: [{ length: 'Min length of 8 characters is required' }] }];
            const errors = schemaValidator({
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                        maxLength: 150
                    },
                    password: {
                        type: 'string',
                        minLength: 8,
                        maxLength: 50,
                    },
                },
                required: [
                    'email', 'password'
                ]
            }, {email: 'pepe@gmail.com', password: '1234'});

            errors.sort().map((error, index) => expect(error).toEqual(expectedErrors[index]));
        });
    });
});