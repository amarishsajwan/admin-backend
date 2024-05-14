const Order = require('./order.model');
const helpers = require('../../utils/helpers');

module.exports = {
    findOne: async function (entry) {
        return await Order.findOne({...entry, isDeleted: false})
    },
    update: async function (entry, fields, options = {}) {
        return await Order.updateOne(entry, fields)
    },
    insertOne: async (fields) => {
        const entryToInsert = {
            ...fields,
            isDeleted: false
        };
        return await new Order(entryToInsert).save();
    },
    find: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        const { limit, skip} = helpers.getFindParams(options);
        return await Order.aggregate([
            {"$match":filter},
            {
                "$lookup": {
                    from: "kitchens",
                    localField: "kitchenId",
                    foreignField: "_id",
                    as: "kitchen"
                }
            },
            {
                "$project": {
                    items: 1,
                    status: 1,
                    address: 1,
                    orderId: 1,
                    orderBy: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    driverDetails: 1,
                    driverStatus: 1,
                    kitchenAddress: 1,
                    kitchenId: {$arrayElemAt: ["$kitchen._id", 0]},
                    kitchenName: {$arrayElemAt: ["$kitchen.kitchenName", 0]},
                    kitchenImage: {$arrayElemAt: ["$kitchen.kitchenLogo", 0]},
                    kitchenCountryCode: {$arrayElemAt: ["$kitchen.countryCode", 0]},
                    kitchenContactNo: {$arrayElemAt: ["$kitchen.contactNo", 0]},
                    isPreOrder: 1,
                    preOrderTime: 1,
                    deliveryCharges: 1,
                    vatTax: 1
                }
            }
        ]).sort({createdAt:-1}).skip(skip).limit(limit)

    },
    count: async (entry) => {
        const filter = {
            isDeleted: false,
            ...entry,
        };
        return await Order.count(filter);
    },
    deleteOne: async (entry) => {
        return await Order.updateOne(entry, {"$set": {isDeleted: true}}, {new: true})
    },

    findOneAndUpdate: async function (entry, fields, options = {}) {
        const filter = {
            isDeleted: false,
            ...entry,
        };
        return await Order.findOneAndUpdate(filter, fields)
    },
    findDetails: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        const {limit, skip} = helpers.getFindParams(options);
        return await Order.aggregate([
            {"$match": filter},
            {
                "$lookup": {
                    from: "kitchens",
                    localField: "kitchenId",
                    foreignField: "_id",
                    as: "kitchen"
                }
            },
            {
                "$lookup": {
                    from: "reviewandratings",
                    localField: "_id",
                    foreignField: "orderId",
                    as: "reviewAndRating"
                }
            },
            {
                "$project": {
                    items: 1,
                    status: 1,
                    address: 1,
                    orderBy: 1,
                    orderId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    driverDetails: 1,
                    driverStatus: 1,
                    dispatchedAt: 1,
                    deliveredAt: 1,
                    driverAssignedAt: 1,
                    driverNotFoundAt: 1,
                    preparingAt: 1,
                    readyAt: 1,
                    rejectedAt: 1,
                    kitchenAddress: 1,
                    kitchenId: {$arrayElemAt: ["$kitchen._id", 0]},
                    kitchenName: {$arrayElemAt: ["$kitchen.kitchenName", 0]},
                    kitchenImage: {$arrayElemAt: ["$kitchen.kitchenLogo", 0]},
                    kitchenCountryCode: {$arrayElemAt: ["$kitchen.countryCode", 0]},
                    kitchenContactNo: {$arrayElemAt: ["$kitchen.contactNo", 0]},
                    rating: {$arrayElemAt: ["$reviewAndRating.rating", 0]},
                    comment: {$arrayElemAt: ["$reviewAndRating.comment", 0]},
                    isPreOrder: 1,
                    preOrderTime: 1,
                    deliveryCharges:1,
                    vatTax:1

                }
            }
        ]).sort({createdAt: -1}).skip(skip).limit(limit)

    },
};
