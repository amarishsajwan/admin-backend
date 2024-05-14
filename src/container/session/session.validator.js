const Joi = require('joi')

module.exports = {
    validateAppLogin: function (user) {
        const schema = {
            username: Joi.string().required(),
            password: Joi.string().required(),
        };

        return Joi.validate(user, schema);
    },
    validateOtp: function (entry) {
        const schema = {
            contact_no: Joi.string().required(),
            country_code: Joi.string().required(),
            platform: Joi.string().required().valid('IOS','ANDROID'),
        };
        return Joi.validate(entry, schema);
    }

};
