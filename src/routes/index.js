const express = require('express');
const router = express.Router();

const userRoutes = require('./auth');
const docsRoutes = require('./docs');

const routes = (redisRefresh, redisExclude) => {
    router.use('/auth', userRoutes(redisRefresh, redisExclude));

    // Documentation
    router.use('/docs', docsRoutes());
    
    router.use((req, res, next) => {
        if (!res.data) {
            next();
        }
 
        res.json({
            data: res.data,
        });
    });

    return router;
};

module.exports = routes;
