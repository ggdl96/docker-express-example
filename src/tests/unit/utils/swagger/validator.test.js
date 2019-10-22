const { mockRequest } = require('mock-req-res');

const validator = require('../../../../utils/swagger');

describe('Validator tests', function () {
    function getDefaultRequest(
        originalUrl = 'some-url',
        method = 'POST',
        headers = { 'content-type': 'application/json' },
        body = { email: 'pepe@gmail.com', password: '12345678' }
    ) {
        return mockRequest({ originalUrl, method, headers, body });
    }

    function getBasicSchema() {
        return {
            'some-url': {
                post: {
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
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
                                    ],
                                },
                            }
                        }
                    },
                },
            },
        };
    }

    describe('Success', function () {
        it('should return true if valid', function () {
            expect(validator(getBasicSchema(), getDefaultRequest())).toEqual([]);
        });
    });
});
