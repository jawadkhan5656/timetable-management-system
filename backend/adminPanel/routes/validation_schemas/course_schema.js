const joi = require('joi')

function course_schema(data) {
    const schema = joi.object({
        course_id: joi.number(),
        
        course_name: joi.string()
        .min(3)
        .max(100)
        .required(),

        course_code: joi.string()
          .min(3)
          .max(15)
          .required(),
          
      credits: joi.string()
          .max(5)
          .required(),

     department_name: joi.string()
          .min(3)
          .max(30)
          .required()
      })

      const valid = schema.validate(data) 
      return valid;
}

module.exports = course_schema;