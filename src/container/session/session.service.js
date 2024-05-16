const { Op, literal } = require('sequelize');
const bcrypt = require('bcrypt');
const adminFacade = require('../admin/admin.facade');
//const tokenFacade = require('../token/token.facade');
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./session.validator');
const helpers = require('../../utils/helpers');
const mailClient = require('../../utils/mailClient');

module.exports = {
    login: async function (entry) {
        const {password, username} = entry;

        let adminData = await adminFacade.findOne({username: username});
        if (!adminData) exceptionHandler.throwError("invalid_user");
        let compare = helpers.comparePassword(adminData.password, password);
        if (!compare) exceptionHandler.throwError("invalid_password");
        let token = 'Bearer ' + helpers.getUserTokens(adminData.id);
            
        return {
            adminProfile: {
            email:adminData.username,  
            },
            token: token
        };
    },
   
};
