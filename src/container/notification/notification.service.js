const facade = require('./notification.facade');
const helpers = require('../../utils/helpers')
const exceptionHandler = require('../../utils/exceptionHandler');
const {ObjectId} = require('mongodb');

module.exports = {
    updateMany: async (userInfo, entry) => {
        const {notificationIds = []} = entry;
        if (!Array.isArray(notificationIds)) exceptionHandler.throwError("invalid_notification_id")
        if (notificationIds.length === 0) exceptionHandler.throwError("notification ids length is zero!")
        let allIds = notificationIds.map(id => ObjectId(id))

        let filter = {
            _id: {"$in": allIds},
            userId: userInfo._id,
        };
        const updatedResponse = await facade.updateMany(filter, {isRead: true});


        if (updatedResponse.modifiedCount != notificationIds.length) return exceptionHandler.throwError('internal_error')
        return;
    },
    find: async (userInfo, options) => {
        let filters = {
            userId: userInfo._id
        };
        return {
            results: await facade.find(filters, options),
            unreadCount: await facade.count({...filters, "isRead": false}),
            totalCount: await facade.count(filters)
        }
    },
    delete: async (userInfo, id) => {

        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_notification_id")
        }
        const updatedResponse = await facade.deleteOne({user_id: userInfo._id, _id: ObjectId(id)})
        if (updatedResponse.modifiedCount != 1) return exceptionHandler.throwError()
    },
    findOne: async (userInfo, id) => {

        if (!helpers.isValidMongoId(id)) {
            exceptionHandler.throwError("invalid_notification_id")
        }

        return await facade.findOne({user_id: userInfo._id, _id: ObjectId(id)}, {});
    },
};
