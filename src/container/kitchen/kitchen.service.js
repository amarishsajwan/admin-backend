const facade = require('./kitchen.facade');
const itemFacade = require('../items/menu.facade');
const exceptionHandler = require('../../utils/exceptionHandler');
const {validateToFind} = require('./kitchen.validator');
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
    find: async (userInfo, options) => {
        const {error} = validateToFind(options)
        if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);

        let {categoryOrCuisinesId = null, type = '0', searchString = null} = options;
        type = parseInt(type)
        let {_id: userId} = userInfo;
        let filters = {};
        if (type === 1) {
            if (categoryOrCuisinesId) {
                filters['_id'] = filters['_id'] = {
                    "$in": await itemFacade.distinct('kitchenId', {
                        categoryId: ObjectId(categoryOrCuisinesId),
                        status: 1
                    })
                }
            }
        } else if (type === 2) {
            if (categoryOrCuisinesId) filters['cuisinesIds'] = ObjectId(categoryOrCuisinesId);
        }
        if (searchString) {
            let categoryOrCuisinesIds = await itemFacade.distinctCategory('title', {
                title: {
                    $regex: searchString,
                    $options: 'i'
                },
                status: 1
            });
            let kitchenIds = await itemFacade.distinct('kitchenId', {
                "$or": [{categoryId: {"$in": categoryOrCuisinesIds}}, {
                    itemName: {
                        $regex: searchString,
                        $options: 'i'
                    },
                    status: 1
                }]
            })

            filters = {
                "$or": [{cuisinesIds: {"$in": categoryOrCuisinesIds}}, {_id: {"$in": kitchenIds}}, {
                    kitchenName: {
                        $regex: searchString,
                        $options: 'i'
                    }
                }]
            }
        }
        let [{results = [], count = []} = []] = await facade.findWithAggregate(filters, options, userId) || []

        return {results, totalCount: count.length > 0 ? count[0]['totalCount'] : 0}
    },
    findOne: async (userInfo, id) => {
        let filter = {
            _id: ObjectId(id)
        };
        let {_id: userId} = userInfo;
        let [data] = await facade.findWithAggregateOne(filter, {}, userId);
        return data;
    },
    shareKitchenInfo: async (shareId) => {
         let [data] = await facade.findWithAggregateOne({shareId},{});
        return data;
    },
};
