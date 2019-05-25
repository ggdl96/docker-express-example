async function getUser(email, password) {
    if (email === 'pepe@gmail.com' && password === '1234') {
        return await Promise.resolve({ name: 'pepe' });
    }

    return await Promise.reject('user not found');
}

async function userExists(email, password) {
    const user = await getUser(email, password) 
    return typeof  user !== 'undefined';
}

module.exports = { userExists, getUser };
