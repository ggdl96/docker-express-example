const ErrorGeneric = require('../Generic');

class RouteNotFound extends ErrorGeneric {
    constructor(message, details, ...args) {
        super(message, details, ...args);
        Error.captureStackTrace(this, RouteNotFound);
        this.status = 404;
    }
}

class RouteMethodNotAllowed extends ErrorGeneric {
    constructor(message, details, ...args) {
        super(message, details, ...args);
        Error.captureStackTrace(this, RouteMethodNotAllowed);
        this.status = 400;
    }
}

class RouteContentTypeNotAllowed extends ErrorGeneric {
    constructor(message, details, ...args) {
        super(message, details, ...args);
        Error.captureStackTrace(this, RouteContentTypeNotAllowed);
        this.status = 400;
    }
}

module.exports = {
    RouteNotFound,
    RouteMethodNotAllowed,
    RouteContentTypeNotAllowed,
};
