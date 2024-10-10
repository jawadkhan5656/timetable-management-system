const joi = require('joi');

function room_schema(data) {
    const schema = joi.object({
        room_id: joi.number(),

        room_number: joi.string()
            .min(2)
            .max(20)
            .required(),
    
        capacity: joi.number()
            .required(),

        department: joi.string()
            .max(30)
            .required(),

        building: joi.string()
            .min(3)
            .max(20)
            .required(),

        is_lab: joi.boolean()
            .required()
    })

    const valid = schema.validate(data)
    return valid;
}

module.exports = room_schema;