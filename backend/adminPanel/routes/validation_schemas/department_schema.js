const joi = require('joi');

function department_schema(data) {
    const schema = joi.object({
        department_id: joi.number()
            .required(),
        department_name: joi.string()
            .min(3)
            .max(30)
            .required()
    })

    const valid = schema.validate(data);
    return valid;
}

module.exports = department_schema;