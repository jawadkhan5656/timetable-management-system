const joi = require('joi');

function section_schema(data) {
    const schema = joi.object({
        section_id: joi.number(),
        
        section_name: joi.string()
            .min(1)
            .max(10)
            .required()
    })

    const valid = schema.validate(data)
    return valid;
}

module.exports = section_schema;