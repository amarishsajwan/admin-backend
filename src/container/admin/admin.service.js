const {ObjectId} = require('mongodb');
const facade = require('./admin.facade');
const tokenFacade = require('../token/token.facade');
const otpService = require('../otp/otp.service');
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./admin.validator');
const helpers = require('../../utils/helpers');
const mailClient = require('../../utils/mailClient');

module.exports = {
    create: async (data) => {
        let hashPassword = await helpers.hashPassword(data.password);
        data.password = hashPassword;
        return await facade.create(data);
    },
    getProfileView: async (userId) => {
        return await facade.findOne({
            _id: userId
        })
    },
    resendVerifyEmail: async (userId) => {
        let user = await facade.findOne({
            _id: userId
        });
        if (user.isVerifiedEmail) exceptionHandler.throwError("email_already_verified");
        let {mailToken = null, email} = user;
        if (!mailToken) {
            mailToken = await helpers.getRandomString();
            const updatedResponse = await facade.update({
                _id
            }, {mailToken});
            if (updatedResponse.nModified != 1) {
                return exceptionHandler.throwError()
            }
        }
        await mailClient.inviteUsers({
            email,
            mailToken: fields['mailToken']
        })

    },
    updateProfileView: async (_id, fields, images) => {
        if (Array.isArray(images) && images.length > 0) {
            console.log("ss",images[0])
            fields['profile_image'] = images[0].location
        }
        const {email = null} = fields;

        const {error} = validator.validateToUpdate(fields)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);

        if (email) {
            fields['mailToken'] = await helpers.getRandomString();
            fields['isVerifiedEmail'] = false
        }

        const updatedResponse = await facade.update({_id}, fields);
        if (updatedResponse.nModified != 1) {
            return exceptionHandler.throwError()
        }
        if (email) {
            await mailClient.inviteUsers({
                email,
                mailToken: fields['mailToken']
            })
        }
        return await facade.findOne({_id})

    },
    updateFcmToken: async (token, fields) => {
        const {deviceToken} = fields;

        if (!deviceToken) exceptionHandler.throwError("invalid_" + error.details[0].path);

        const updatedResponse = await tokenFacade.updateOne({
            token
        }, {
            deviceToken
        });
        if (updatedResponse.nModified != 1) {
            return exceptionHandler.throwError()
        }
    },
    changeContactNumber: async (userId, fields) => {
        const {
            error
        } = validator.validateToCheckContactNumber(fields)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);

        let entry = {
            ...fields,
            user_id: userId,
            type: 'changeContact'
        };
        await otpService.insertOne(entry)
    },
    updateContactNumber: async (userId, fields) => {
        const {
            otp
        } = fields;
        if (!otp) exceptionHandler.throwError('invalid_otp');

        let result = await otpService.findOne({
            otp,
            user_id: userId
        });
        if (!result) exceptionHandler.throwError('invalid_otp');

        const {
            country_code,
            contact_no
        } = result;
        // we need testing if the number already add to any user account or not

        const updatedResponse = await facade.update({
            _id: userId
        }, {
            country_code,
            contact_no,
            isActive: true
        });
        if (updatedResponse.nModified != 1) {
            return exceptionHandler.throwError()
        }
    },
    verifyMail: async (mailToken) => {
        if (!mailToken) exceptionHandler.throwError('invalid_mail_token');
        let user = await facade.findOne({
            mailToken
        });
        if (!user) exceptionHandler.throwError('no_user_associate_to_mail');
        if (user.isVerifiedEmail) exceptionHandler.throwError('user_already_verified');
        const updatedResponse = await facade.update({
            mailToken
        }, {
            mailToken: null,
            isVerifiedEmail: true
        });
        if (updatedResponse.nModified != 1) {
            return exceptionHandler.throwError()
        }
    },
    verifyOtp: async (fields) => {
        const {
            error
        } = validator.validateOtp(fields)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        let result = await otpService.findOne(fields);
        return {
            isOtpMatch: result ? true : false
        }
    },
    deleteAccount: async (id) => {
        let filter = {user_id: id};

        let fieldsToUpdate = {isDeleted: true}
        await tokenFacade.updateMany(filter, fieldsToUpdate);
        await facade.update({_id: id}, fieldsToUpdate);
        return;

    },
    addToFavourite: async (userId, fields) => {
        const {error} = validator.validateToAddToFavourite(fields)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {isFavourite = false, menuId, kitchenId} = fields;
        if (!menuId && !kitchenId) exceptionHandler.throwError("invalid_kitchenId_or itemId");
        let fieldToUpdate = {}

        if (isFavourite) {
            if (menuId) fieldToUpdate = {$addToSet: {favouriteItems: ObjectId(menuId)}};
            else fieldToUpdate = {$addToSet: {favouriteKitchens: ObjectId(kitchenId)}};
        } else {
            if (menuId) fieldToUpdate = {$pull: {favouriteItems: ObjectId(menuId)}};
            else fieldToUpdate = {$pull: {favouriteKitchens: ObjectId(kitchenId)}};
        }

        const updatedResponse = await facade.update({_id: userId}, fieldToUpdate);
        if (updatedResponse.nModified != 1) {
            return exceptionHandler.throwError()
        }
    }
};