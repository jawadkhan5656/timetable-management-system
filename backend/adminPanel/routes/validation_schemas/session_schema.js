const joi = require('joi');

function session_schema(data) {
    const schema = joi.object({
        session_id: joi.number(),
            
        batch: joi.string()
            .min(4)
            .max(20)
            .required(),

        session_name: joi.string()
            .valid('fall', 'spring')
            .required()
    })

    const valid = schema.validate(data);
    return valid;
}

module.exports = session_schema;