const { RouteContentTypeNotAllowed } = require('../../models/Error/OpenApi');

const routeValidator = require('./routeValidator');
const schemaValidator = require('./schemaValidator');

module.exports = (routes, req) => {
    try {
        const routeIsValid = routeValidator(routes, req);
    
        if (routeIsValid) {
            if (req.method !== 'GET') {
                const contentTypes = Object.keys(routes[req.originalUrl][req.method].requestBody.content);
                const reqContentType = req.headers['content-type'];

                if (!contentTypes.includes(reqContentType)) {
                    throw new RouteContentTypeNotAllowed(`content-type: ${reqContentType} is not allowed`);
                }

                return schemaValidator(routes, req);
            }

            return true;
        }
    } catch (e) {
        throw e;
    }

    return false;
};
