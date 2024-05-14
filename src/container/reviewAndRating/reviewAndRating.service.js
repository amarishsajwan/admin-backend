const facade = require('./reviewAndRating.facade');
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./reviewAndRating.validator');
const {ObjectId} = require('mongodb')
module.exports = {
    create: async (userId, body) => {
        const {error} = validator.validateToCreate(body)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {kitchenId, orderId} = body
        let data = await facade.insertOne({
            ...body,
            kitchenId: ObjectId(kitchenId),
            orderId: ObjectId(orderId),
            orderBy: userId
        })

        return data;


    },
    find: async (userId, options) => {
        const {error} = validator.validateFindOptions(options)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {kitchenId} = options
        let filters = {
            kitchenId: ObjectId(kitchenId),
            isDeleted: false
        };
        return {
            results: await facade.find(filters, options),
            totalCount: await facade.count(filters)
        }
    },
}