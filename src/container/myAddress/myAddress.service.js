const facade = require('./myAddress.facade');
const helpers = require('../../utils/helpers');
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./myAddress.validator');


module.exports = {
    create: async (userId, addressToCreate) => {

        const {error} = validator.validateToCreate(addressToCreate)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {isDefaultAddress = false} = addressToCreate;
        if (isDefaultAddress) {
            await facade.updateMany({createdBy: userId}, {isDefaultAddress: false})
        }

        return await facade.insertOne({...addressToCreate, createdBy: userId})


    },
    update: async (userId, id, fields) => {

        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_address_place_id")
        }

        const {error} = validator.validateToUpdate(fields)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {isDefaultAddress = false} = fields;
        if (isDefaultAddress) {
            await facade.updateMany({createdBy: userId}, {isDefaultAddress: false})
        }
        let filter = {
            _id: id,
            createdBy: userId
        };

        return await facade.findOneAndUpdate(filter, fields);

    },
    delete: async (userId, id) => {

        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_address_place_id")
        }
        const updatedResponse = await facade.deleteOne({createdBy: userId, _id: id})

        if (updatedResponse.nModified != 1) {
            return exceptionHandler.throwError()
        }
    },

    find: async (userId, options) => {
        let filters = {
            createdBy: userId
        };
        return {
            results: await facade.find(filters, options),
            totalCount: await facade.count(filters)
        }
    },
    findOne: async (userId, id) => {
        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_address_place_id")
        }
        let filters = {
            createdBy: userId,
            _id: id
        };
        return await facade.findOne(filters);
    }
};
