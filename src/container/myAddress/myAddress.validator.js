const Joi = require('joi')

module.exports = {
    validateToCreate: function (user) {
        const schema = {
            houseOrFlatNumber: Joi.string().required(),
            landmark: Joi.string().required(),
            type: Joi.string().required().valid('HOME', 'OFFICE', 'OTHER'),
            customType: Joi.string(),
            fullAddress: Joi.string(),
            isDefaultAddress: Joi.boolean(),
            location: Joi.object({
                type: Joi.string().required(),
                coordinates: Joi.array().required().min(2).max(2)
            }),
            cityName: Joi.string(),
            countryName: Joi.string(),
            areaName: Joi.string(),
            zipCode: Joi.string().required(),
            latitude: Joi.number(),
            longitude: Joi.number(),
            bawsalaCode:Joi.string(),
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
    },
    validateToUpdate: function (user) {
        const schema = {
            houseOrFlatNumber: Joi.string(),
            landmark: Joi.string(),
            type: Joi.string().valid('HOME', 'OFFICE', 'OTHER'),
            customType: Joi.string(),
            fullAddress: Joi.string(),
            isDefaultAddress: Joi.boolean(),
            location: Joi.object({
                type: Joi.string().required(),
                coordinates: Joi.array().required().min(2).max(2)
            }),
            cityName: Joi.string(),
            countryName: Joi.string(),
            areaName: Joi.string(),
            zipCode: Joi.string(),
            bawsalaCode:Joi.string().allow('')
        };
        return Joi.validate(user, schema);
    },
};
