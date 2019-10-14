const ErrorGeneric = require('../Generic');

class UserNotFound extends ErrorGeneric {
    constructor(message, details, ...args) {
        super(message, details, ...args);
        Error.captureStackTrace(this, UserNotFound);
        this.status = 404;
    }
}

class BadRequest extends ErrorGeneric {
    constructor(message, details, ...args) {
        super(message, details, ...args);
        Error.captureStackTrace(this, BadRequest);
        this.status = 400;
    }
}

class ServerError extends ErrorGeneric {
    constructor(message, details, ...args) {
        super(message, details, ...args);
        Error.captureStackTrace(this, ServerError);
        this.status = 500;
        this.message = 'Error while requesting access' || message;
        this.details = 'Unknown Error' || details;
    }
}

module.exports = {
    UserNotFound,
    BadRequest,
    ServerError
};
