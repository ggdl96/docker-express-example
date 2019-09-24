const express = require('express');
const router = express.Router();

const authController = require('../../controllers/auth');

const auth = (redisRefresh, redisExclude) => {
    router.post('/login', authController(redisRefresh).login);

    router.post('/logout', authController(redisExclude).logout);

    router.post('/refresh', authController(redisRefresh).refresh);

    return router;
};

module.exports = auth;
