const exceptionHandler = require('../../utils/exceptionHandler');
const checkoutClient = require('../../utils/checkoutClient');
const checkoutCustomer = require('./checkoutCustomer.facade');
module.exports = {

    create: async (userId, entryToCreate) => {
        const {token = null, isDefault = false} = entryToCreate
        if (!token) exceptionHandler.throwError("invalid_" + error.details[0].path);
        let customer = await checkoutCustomer.findOne({userId})
        if (!customer) {
            let data = await checkoutClient.createInstruments({
                "type": "token",
                token,
                default: isDefault
            });
            await checkoutCustomer.insertOne({userId, customerId: data['customer']['id']})
            return data;
        } else {
            return await checkoutClient.createInstruments({
                "type": "token",
                token,
                default: isDefault,
                customer: {
                    id: customer['customerId']
                }

            })
        }
    },
    find: async (userId) => {
       let customers=await checkoutCustomer.findOne({userId})
        if(!customers) return {
            "id":null,
            "email": null,
            "name":null,
            "default": null,
            "instruments": [
            ]
        };
        return await checkoutClient.getCustomerCard(customers['customerId'])
    },
    delete: async (userId, instrumentId) => {
        return await checkoutClient.deleteInstruments(instrumentId)
    },
};