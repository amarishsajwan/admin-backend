const Joi = require('joi')

module.exports = {
    validateToAddFavouriteKitchen: function (user) {
        const schema = {
            kitchenId: Joi.string().required()
        };
        return Joi.validate(user, schema);
    },
    validateToAddFavouriteMenu: function (user) {
        const schema = {
            menuId: Joi.string().required(),
        };
        return Joi.validate(user, schema);
    },
    validateFindOptions: function (entry) {
        const schema = {
            sort: Joi.string().c,
            page: Joi.number().min(1),
            limit: Joi.number().min(1).max(100),
            type: Joi.string(),
            search: Joi.string()
        };
        return Joi.validate(entry, schema);
    }
};
