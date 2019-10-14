const { RouteMethodNotAllowed, RouteNotFound } = require('../../models/Error/OpenApi');

module.exports = (routes, req) => {
    if (routes[req.originalUrl]) {
        const httpMethods = Object
            .keys(routes[req.originalUrl])
            .map(route => route.toUpperCase());

        if (!httpMethods.includes(req.method)) {
            throw new RouteMethodNotAllowed(`Request Method: ${req.method} is not allowed`);
        }

        return true;
    }

    throw new RouteNotFound('Requested URL was not found');
};
