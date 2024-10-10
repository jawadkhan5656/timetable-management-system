const joi = require('joi');

function admin_schema(data) {
    const schema = joi.object({
    
        admin_name: joi.string()
            .min(3)
            .max(30)
            .required(),
    
        email: joi.string()
            .email()
            .required(),
    
        password: joi.string()
            .min(8)
            .max(30)
            .required()
    });

    const valid = schema.validate(data)
    return valid;
}

module.exports = admin_schema;