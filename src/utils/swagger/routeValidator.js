const {
    RouteMethodNotAllowed,
    RouteNotFound,
    RouteContentTypeNotAllowed,
} = require('../../models/Error/OpenApi');
const commonMethods = ['GET','POST','PUT','PATCH'];

module.exports = (routes, { originalUrl, method, headers } = {}) => {
    if (!routes || !(originalUrl && method && headers)) {
        throw new Error('Both routes and req are required');
    }

    if (
        typeof routes !== 'object'
        || Array.isArray(routes)
        || Object.keys(routes).length === 0
    ) {
        throw new Error('routes param is not valid');
    }
    if (routes[originalUrl]) {
        const httpMethods = Object
            .keys(routes[originalUrl])
            .map(route => route.toUpperCase());

        if (!commonMethods.includes(method)) {
            throw new RouteMethodNotAllowed(`Request Method: ${method} is not valid`);
        }

        if (!httpMethods.includes(method)) {
            throw new RouteMethodNotAllowed(`Request Method: ${method} is not allowed`);
        }

        if (method !== 'GET') {
            const contentTypes = Object.keys(routes[originalUrl][method].requestBody.content);
            const reqContentType = headers['content-type'];
    
            if (!contentTypes.includes(reqContentType)) {
                throw new RouteContentTypeNotAllowed(`content-type: ${reqContentType} is not allowed`);
            }
        }

        return true;
    }

    throw new RouteNotFound('Requested URL was not found');
};
