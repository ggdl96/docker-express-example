const express = require('express');
const router = express.Router();

const userRoutes = require('./auth');
const docsRoutes = require('./docs');

const openApiValidator = require('./middlewares/openApi');

const routes = async (redisRefresh, redisExclude) => {
    const requestValidator = await openApiValidator();

    router.use('/auth', requestValidator, userRoutes(redisRefresh, redisExclude));

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
