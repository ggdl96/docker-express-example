const createError = require('http-errors');

async function getUser(email, password) {
    try {
        if (email === 'pepe@gmail.com' && password === '1234') {
            return await Promise.resolve({ name: 'pepe' });
        }

        throw new Error('User not Found');
    } catch(err) {
        throw createError.NotFound(err.message);
    }
}

async function userExists(email, password) {
    const user = await getUser(email, password) ;
    return typeof  user !== 'undefined';
}

module.exports = { userExists, getUser };
