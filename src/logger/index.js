const log4js = require('log4js');

log4js.configure({
    appenders: {
        test: { type: 'file', filename: 'test-v1.log' },
        error: { type: 'file', filename: 'error-v1.log' },
    },
    categories: {
        default: {
            appenders: ['test'],
            level: 'info'
        },
        error1: {
            appenders: ['error'],
            level: 'error'
        }
    },
});
 
module.exports = {
    default: log4js.getLogger('default'),
    error: log4js.getLogger('error1'),
};
