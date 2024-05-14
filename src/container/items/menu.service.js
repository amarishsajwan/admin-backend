const facade = require('./menu.facade');
const exceptionHandler = require('../../utils/exceptionHandler');
const {ObjectId} = require('mongodb');

module.exports = {
    updateMany: async (userId, entry) => {
        const {notificationIds = []} = entry;
        if (!Array.isArray(notificationIds)) exceptionHandler.throwError("invalid_notification_id")
        if (notificationIds.length === 0) exceptionHandler.throwError("notification ids length is zero!")
        let allIds = notificationIds.map(id => ObjectId(id))

        let filter = {
            user_id: ObjectId(userId),
            _id: {"$in": allIds}
        };
        const updatedResponse = await facade.updateMany(filter, {isRead: true});
        if (updatedResponse.modifiedCount != notificationIds.length) return exceptionHandler.throwError('internal_error')
        return;
    },
    find: async (userInfo, options, ) => {
        let filters = {};
        let {favouriteItems = [], _id:userId} = userInfo;
        const {kitchenId = null, categoryId = null, subCategoryId = null, search = null, recipesType = null, isFavourite = false, isFeatured = false} = options;
        if (search) {
            filters = {itemName: {$regex: search, $options: 'i'}}
        }

        if (kitchenId) filters['kitchenId'] = ObjectId(kitchenId);
        else  filters['isDisable'] = false;

        if (categoryId) filters['categoryId'] = ObjectId(categoryId);
        if (subCategoryId) filters['subCategoryId'] = ObjectId(subCategoryId);
        if (recipesType) filters['recipesType'] = recipesType;
        if (isFavourite) filters['_id'] = {"$in": favouriteItems}
        if (isFeatured) filters['isFeatured'] = true;

        return await facade.find(filters, options, userId)
    },
    categoryList: async (userId, options) => {
        return await facade.categoryList({}, options)
    },
    findOne: async (userId, id) => {
        let filter = {
            _id: ObjectId(id)
        };
        return await facade.findOne(filter, userId);
    }
};
