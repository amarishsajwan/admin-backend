const tokenFacade = require('../token/token.facade');
const userFacade = require('../user/user.facade');
const adminFacade = require('../admin/admin.facade');
const helpers = require('../../utils/helpers');
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./session.validator');
const otpService = require('../otp/otp.service');


module.exports = {
    login: async function (entry) {
        const {password, username} = entry;

        let adminData = await adminFacade.findOne({username: username});
        if (!adminData) throw new Error(Message.userNotExists)
        let compare = helpers.comparePassword(adminData.password, password);
        if (!compare) throw new Error(Message.passwordNotMatched)
            
        return {
            adminProfile: {
            email:adminData.username,  
            },
            token: {
                access: helpers.generateToken({id:adminData.id}),
                type: 'Bearer',
            },
        };
        // let token = await helpers.getUserToken(userData)
        // await sessionFacade.create({ cid: parseInt(marketId),userId:userData["_id"],loginData: {token, ...helpers.getTimeStamps()}})
        // return token;
    },
    logout: async (userId, token) => {
        const updatedResponse = await tokenFacade.logout({user_id: userId, token})
        if (updatedResponse.nModified != 1) return exceptionHandler.throwError()
    },

    otpLogin: async (entry) => {

        const {error} = validator.validateOtp(entry);
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);

        const {country_code, contact_no} = entry;

        let user = await userFacade.findOne({country_code, contact_no, isActive: true});
        if (!user) user = await userFacade.insertOne(entry);

        await otpService.insertOne({...entry, user_id: user._id, type: 'login'});
        return;

    }
};
