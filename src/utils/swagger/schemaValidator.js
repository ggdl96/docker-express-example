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

module.exports = (schema, body) => {
    if (!schema && !body) {
        throw new Error('Both schema and body are required');
    }

    const validationSchema = schema;
    const propertiesRequired = validationSchema.required;

    if (propertiesRequired && propertiesRequired.length) {
        const validatedRequired = propertiesRequired.reduce((acc, key) =>
            (typeof body[key] === 'undefined') ? [...acc, key] : [...acc], []);

        if (validatedRequired.length) {
            return validatedRequired;
        }
    }
    const validationObject = validateBodyRequest(body, schema);

    return validationObject;
};