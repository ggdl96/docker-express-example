const validateBodyRequest = (body, schema) =>
    Object.entries(body).reduce((properties, [property, value]) => {
        const rules = schema.properties[property];
        const toReturn = Object.entries(rules).reduce((acc, [rule, ruleValue]) => {
            switch(rule) {
            case 'type':
                if (typeof value !== ruleValue) {
                    return [...acc, { [ruleValue]: false }];
                }
                break;
            case 'minLength':
                if (value.length < ruleValue) {
                    return [...acc, { [ruleValue]: false }];
                }
                break;
            case 'maxLength':
                if (value.length > ruleValue) {
                    return [...acc, { [ruleValue]: false }];
                }
                break;
            default:
                break;
            }
            return acc;
        }, []);

        return [
            ...properties,
            ...toReturn.length ? [{ [property]: toReturn }] : []
        ];
    }, []);

module.exports = (routes, req) => {
    const contentTypes = Object.keys(routes[req.originalUrl].post.requestBody.content);
    const reqContentType = req.headers['content-type'];

    if (!contentTypes.includes(reqContentType)) {

        return false;
    }
    const schema = routes[req.originalUrl].post.requestBody.content[reqContentType].schema;
    const propertiesRequired = schema.required;

    if (propertiesRequired && propertiesRequired.length) {
        const validatedRequired = propertiesRequired.reduce((acc, key) =>
            (typeof req.body[key] === 'undefined') ? [...acc, key] : [...acc], []);

        if (validatedRequired.length) {
            return validatedRequired;
        }
    }
    const validationObject = validateBodyRequest(req.body, schema);

    return validationObject;
};