const joi = require('joi');

function programSchema(data) {
    const schema = joi.object({
        program_id: joi.number(),
            
        program_name: joi.string()
            .min(2)
            .max(30)
            .required(),

        credits_required: joi.number()
            .required(),

        department_id: joi.number(),

        department_name: joi.string()
        .min(3)
        .max(30)
        .required()
    })

    const valid = schema.validate(data)
    return valid;
}

module.exports = programSchema;