const joi = require('joi');

function teacher_schema(data) {
    const schema = joi.object({

        teacher_id: joi.number(),
    
        teacher_name: joi.string()
            .min(3)
            .max(50)
            .required(),
    
        department_id: joi.number(),
    
        designation: joi.string()
            .min(3)
            .max(20)
            .required(),
        
        email: joi.string()
            .email()
            .required(),

        department_name: joi.string()
            .min(3)
            .max(30)
            .required()
    })
    
    const valid = schema.validate(data)
    return valid;    
}

module.exports = teacher_schema;