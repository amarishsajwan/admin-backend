
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./payment.validator');
const checkoutClient = require('../../utils/checkoutClient');
const facade = require('./payment.facade');
module.exports = {

    create: async (userId, entryToCreate) => {
        const {error} = validator.validateToCreate(entryToCreate)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {cartToken} = entryToCreate
        return await checkoutClient.paymentWithToken(cartToken)
    },
    cardList: async (userId) => {
       let customers=await facade.findOne({userId})
        /*if(!customers) return {
            "id":null,
            "email": null,
            "name":null,
            "default": null,
            "instruments": [
            ]
        };*/
        return await checkoutClient.getCustomerCard()
    }
};