const { UserNotFound } = require('../models/Error/Core');

async function getUser(email, password) {
    try {
        if (email === 'pepe@gmail.com' && password === '12345678') {
            return await Promise.resolve({ name: 'pepe' });
        }

        throw new UserNotFound('User not Found');
    } catch(err) {
        throw err;
    }
}

async function userExists(email, password) {
    const user = await getUser(email, password) ;
    return typeof  user !== 'undefined';
}

module.exports = { userExists, getUser };
