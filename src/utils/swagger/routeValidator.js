const { RouteMethodNotAllowed, RouteNotFound } = require('../../models/Error/OpenApi');
const commonMethods = ['GET','POST','PUT','PATCH'];

module.exports = (routes, { originalUrl, method } = {}) => {
    if (!routes && !originalUrl && !method) {
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

        return true;
    }

    throw new RouteNotFound('Requested URL was not found');
};
