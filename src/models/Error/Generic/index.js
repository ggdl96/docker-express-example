class ErrorGeneric extends Error {
    constructor(message, details, ...args) {
        super(message, details, ...args);
        Error.captureStackTrace(this, ErrorGeneric);
        this.message = message;
        this.details = details;
    }
}

module.exports = ErrorGeneric;
