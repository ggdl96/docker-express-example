const { UserNotFound } = require('../models/Error/Core');
const { default: logger } = require('../logger');

async function getUser(email, password) {
    logger.info('email of user: ', email);

    if (email === 'pepe@gmail.com' && password === '12345678') {
        return await Promise.resolve({ name: 'pepe', email: 'pepe@pepe.com', role: 'admin' });
    }

    throw new UserNotFound('User not Found');
}

async function userExists(email, password) {
    const user = await getUser(email, password) ;
    return typeof  user !== 'undefined';
}

module.exports = { userExists, getUser };
