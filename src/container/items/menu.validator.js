const Joi = require('joi')

module.exports = {
    validateToFind: function (user) {
        const schema = {
            type: Joi.string(),
            latitude: Joi.string(),
            longitude: Joi.string(),
            searchString: Joi.string(),
            kitchenId: Joi.string(),
            categoryId: Joi.string(),
            subCategoryId: Joi.string(),
            search: Joi.string(),
            recipesType: Joi.string(),
            isFavourite: Joi.string(),
            isFeatured: Joi.string(),
            page: Joi.string(),
            limit: Joi.string(),
        };
        return Joi.validate(user, schema);
    }

};
