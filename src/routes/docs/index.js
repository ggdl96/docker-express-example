const express = require('express');
const path = require('path');
const router = express.Router();
const SwaggerParser = require('swagger-parser');

const docs = () => {

    router.get('/', async (req, res, next) => {
        try {
            const doc = await SwaggerParser.bundle(path.join(__dirname, '../../docs/openapi.yaml'));
            res.json(doc);
        } catch(err) {
            next(err);
        }
        
    });

    return router;
};

module.exports = docs;
