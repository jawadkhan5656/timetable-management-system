const joi = require('joi');

function semesterSchema(data) {
    const schema = joi.object({

        springFall: joi.string()
            .required(),

        year: joi.number()
            .required(),


        batch: joi.string()
            .required(),

        session_name: joi.string()
            .required()
    
        
    })

    const valid = schema.validate(data);
    return valid;
}

module.exports = semesterSchema;