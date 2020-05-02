const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const indexRouter = require('./routes/index');
const redisDB = require('./services/redis');
const helmet = require('helmet');
const { default: logger } = require('./logger');

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

indexRouter(
    redisDB.createClientForRefreshTokens(),
    redisDB.createClientForExcludedTokens()
)
    .then((resolvedRoutes) => {
        logger.info('Routes resolved');
        app.use(
            '/',
            resolvedRoutes
        );

        // catch 404 and forward to error handler
        app.use(function(req, res, next) {
            next(createError(404));
        });

        // error handler
        // eslint-disable-next-line no-unused-vars
        app.use(function(err, req, res, next) {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            res.status(err.status || 500);

            res.send({
                error: { description: err.message || 'error' }
            });
        });
    })
    .catch(e => {
        throw new Error(e);
    });

module.exports = app;
