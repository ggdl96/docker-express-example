const path = require('path');

const validator = require('../../utils/swagger/');
const SwaggerParser = require('swagger-parser');

// global routes object, to avoid loading it every time
let routes = {};

const docs = async () => {
    try {
        const doc = await SwaggerParser.bundle(path.join(__dirname, '../../docs/openapi.yaml'));

        return doc;
    } catch (e) {
        throw new Error(e);
    }
};

const populateRoutes = (docs) => {
    return Object.entries(docs.paths).reduce((paths, [path, pathSchemas]) => {
        return { ...paths, [path]: { ...pathSchemas } };
    }, {});
};

const openApiMiddleware = (req, res, next) => {
    let validations;
    try {
        validations = validator(routes, req);
    } catch(e) {
        return next(e);
    }

    if (validations.length) {
        res.status(400);
        next({ openApi: validations });

        return false;
    }
    next();
};

module.exports = async () => {
    let docsSchema;
    try {
        docsSchema = await docs();
        routes = populateRoutes(docsSchema);
    } catch (e) {
        throw e;
    }

    return openApiMiddleware;
};
