const facade = require('./favourite.facade');
const helpers = require('../../utils/helpers');
const exceptionHandler = require('../../utils/exceptionHandler');
const validator = require('./favourite.validator');
const {ObjectId} = require('mongodb');


module.exports = {
    addToFavouriteKitchen: async (userId, fields) => {
        const {error} = validator.validateToAddFavouriteKitchen(fields)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {kitchenId = null} = fields;
        if (await facade.findOne({
            kitchenId: ObjectId(kitchenId),
            userId
        })) exceptionHandler.throwError("already add to favourite");
        return await facade.insertOne({kitchenId: ObjectId(kitchenId), userId})
    },

    addToFavouriteMenu: async (userId, fields) => {
        const {error} = validator.validateToAddFavouriteMenu(fields)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
        const {menuId = null} = fields;
        if (await facade.findOne({
            menuId: ObjectId(menuId),
            userId
        })) exceptionHandler.throwError("already add to favourite");
        return await facade.insertOne({menuId: ObjectId(menuId), userId})
    },

    favouriteKitchenList: async (userId, options) => {
        let filters = {
            userId,
            menuId: null,
            isDeleted: false
        };
        let [{results = [], count = []} = []] = await facade.findFavouriteKitchen(filters, options) || []
        return {results, totalCount: count.length > 0 ? count[0]['totalCount'] : 0}
    },
    favouriteMenuList: async (userId, options) => {
        let filters = {
            userId,
            kitchenId: null,
            isDeleted: false
        };
        let [{results = [], count = []} = []] = await facade.findFavouriteMenu(filters, options) || []
        return {results, totalCount: count.length > 0 ? count[0]['totalCount'] : 0}
    },
    delete: async (userId, id) => {

        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_favourite_id")
        }
        const updatedResponse = await facade.deleteOne({userId: userId, _id: ObjectId(id)})

        if (updatedResponse.nModified != 1) {
            return exceptionHandler.throwError()
        }
    },
};
