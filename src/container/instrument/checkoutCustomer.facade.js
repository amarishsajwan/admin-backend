const checkoutCustomerModel = require('./checkoutCustomer.model');

module.exports = {
    findOne: async function (entry) {
        return await checkoutCustomerModel.findOne(entry)
    },
    insertOne: async (fields) => {
        const entryToInsert = {
            ...fields
        };
        return await new checkoutCustomerModel(entryToInsert).save();
    }
};
