const Joi = require('joi')

module.exports = {
    validateToFind: function (user) {
        const schema = {
            page: Joi.string(),
            limit: Joi.string(),
            categoryOrCuisinesId: Joi.string(),
            type: Joi.string(),
            latitude: Joi.string(),
            longitude: Joi.string(),
            searchString: Joi.string(),
            sort:Joi.string()
        };
        return Joi.validate(user, schema);
    }

};
