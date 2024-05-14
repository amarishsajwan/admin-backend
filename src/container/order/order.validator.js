const Joi = require('joi')

module.exports = {
    validateToCreate: function (user) {
        const schema = {
            items: Joi.array().items(Joi.object(({
                packageType: Joi.string(),
                price: Joi.number().required(),
                addOnItemIds: Joi.array().items(Joi.string()),
                quantity: Joi.number().required(),
                itemId: Joi.string().required(),
                itemImage: Joi.string(),
                itemName: Joi.string().required(),
                description: Joi.string()
            }))).required(),
            cartIds: Joi.array().items(Joi.string()),
            addressId: Joi.string().required(),
            totalPrice: Joi.number().required(),
            specialInstructions: Joi.string(),
            kitchenId: Joi.string().required(),
            isPreOrder: Joi.boolean(),
            preOrderTime:Joi.number(),
            paymentMode: Joi.string(),
            cardToken:Joi.string(),
            cardId:Joi.string(),
            address: Joi.object({
                houseOrFlatNumber: Joi.string().required(),
                landmark: Joi.string().required(),
                fullAddress: Joi.string(),
                type: Joi.string().required().valid('HOME', 'OFFICE', 'OTHER'),
                location: Joi.object({
                    type: Joi.string().required(),
                    coordinates: Joi.array().required().min(2).max(2)
                }),
            })

        };
        return Joi.validate(user, schema);
    },
    validateFindOptions: function (entry) {
        const schema = {
            sort: Joi.string().valid('name'),
            page: Joi.number().min(1),
            limit: Joi.number().min(1).max(100),
            type: Joi.string(),
            status: Joi.string(),
            search: Joi.string(),
        };
        return Joi.validate(entry, schema);
    },
    validateToAddReview: function (entry) {
        const schema = {
            comment: Joi.string(),
            rating: Joi.number().required().min(1).max(5)
        };
        return Joi.validate(entry, schema);
    },

};
