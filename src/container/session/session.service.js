const helpers = require('../../utils/helpers');

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
   
};
