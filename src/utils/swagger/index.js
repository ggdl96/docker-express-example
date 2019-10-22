const { RouteContentTypeNotAllowed } = require('../../models/Error/OpenApi');

const routeValidator = require('./routeValidator');
const schemaValidator = require('./schemaValidator');

module.exports = (routes, req) => {
    try {
        const routeIsValid = routeValidator(routes, req);

        if (routeIsValid) {
            if (req.method === 'GET' && req.body) {
                throw new Error('Get');
            }

            const content = routes[req.originalUrl][req.method.toLowerCase()].requestBody.content;
            const contentTypes = Object.keys(routes[req.originalUrl][req.method.toLowerCase()].requestBody.content);
            const reqContentType = req.headers['content-type'];

            if (!contentTypes.includes(reqContentType)) {
                throw new RouteContentTypeNotAllowed(`content-type: ${reqContentType} is not allowed`);
            }

            let validationsErrors = [];

            if (req.method !== 'GET') {
                validationsErrors = schemaValidator(content[reqContentType].schema, req.body);
            }

            return validationsErrors;
        }
        return [];
    } catch (e) {
        throw e;
    }
};
