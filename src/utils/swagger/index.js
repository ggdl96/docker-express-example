const routeValidator = require('./routeValidator');
const schemaValidator = require('./schemaValidator');

module.exports = (routes, req) => {
    if (routeValidator(routes, req)) {
        return schemaValidator(routes, req);
    }
    return false;
};
