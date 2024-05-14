const Joi = require('joi')

module.exports = {
    validateToCreate: function (user) {
        const schema = {
            contact_no: Joi.string().required(),
            country_code: Joi.string().required(),
            password: Joi.string().required(),
            device_id: Joi.string().required(),
            device_token: Joi.string(),
            platform: Joi.string().required().valid('IOS', 'ANDROID'),
            app_version: Joi.string().required(),
            email: Joi.string().email().required(),
            otp: Joi.string().required(),
            first_name: Joi.string().required(),
            last_name: Joi.string().required(),
            gender: Joi.string().valid('male', 'female', 'other'),
            language: Joi.string().valid('en', 'ar')
        };
        return Joi.validate(user, schema);
    },
    validateToUpdate: function (user) {
        const schema = {
            name: Joi.string(),
            gender: Joi.string().valid('male', 'female', 'other'),
            dob: Joi.string(),
            language_translation: Joi.string(),
            profile_image: Joi.string(),
            email: Joi.string().email(),
            language: Joi.string().valid('en', 'ar'),
        };
        return Joi.validate(user, schema);
    },
    validateToCheckContactNumber: function (user) {
        const schema = {
            country_code: Joi.string().required(),
            contact_no: Joi.string().required(),
            platform: Joi.string().required().valid('IOS', 'ANDROID'),
        };
        return Joi.validate(user, schema);
    },

    validateOtp: function (user) {
        const schema = {
            country_code: Joi.string().required(),
            contact_no: Joi.string().required(),
            otp: Joi.string().required(),
            type: Joi.string().required().valid('register', 'passwordReset', 'changeContact')
        };
        return Joi.validate(user, schema);
    },
    validateToAddToFavourite: function (user) {
        const schema = {
            menuId: Joi.string(),
            kitchenId: Joi.string(),
            isFavourite: Joi.boolean().required().valid(true, false)
        };
        return Joi.validate(user, schema);
    },

};
