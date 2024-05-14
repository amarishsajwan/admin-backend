const paymetModel = require('./paymet.model');
const transectionModel = require('../instrument/checkoutCustomer.model');
const helpers = require('../../utils/helpers');

module.exports = {
    findOne: async function (entry) {
        return await transectionModel.findOne(entry)
    },
    update: async function (entry, fields, options = {}) {
        return await Cart.updateOne(entry, fields)
    },
    insertOne: async (fields) => {
        const entryToInsert = {
            ...fields
        };
        return await new transectionModel(entryToInsert).save();
    },
    insertMany: async (fields) => {
        return await new paymetModel(fields).save();
    },
    find: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        const {sort, limit, skip} = helpers.getFindParams(options);
        return await Cart.aggregate([
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
                    from: "items",
                    localField: "itemId",
                    foreignField: "_id",
                    as: "items"
                }
            },
            {
                "$project": {
                    itemId: 1,
                    itemName: 1,
                    itemImage: 1,
                    description: 1,
                    packageType: 1,
                    price: 1,
                    isPreOrder: {$arrayElemAt: ["$items.isPreOrder", 0]},
                    preOrderTime: {$arrayElemAt: ["$items.preOrderTime", 0]},
                    isDeleted: 1,
                    quantity: 1,
                    orderBy: 1,
                    addOnItemIds: 1,
                    kitchenId: {$arrayElemAt: ["$kitchen._id", 0]},
                    kitchenName: {$arrayElemAt: ["$kitchen.kitchenName", 0]},
                    kitchenImage: {$arrayElemAt: ["$kitchen.kitchenLogo", 0]},
                    kitchenAddress: {$arrayElemAt: ["$kitchen.kitchenAddress", 0]},
                    kitchenCountryCode: {$arrayElemAt: ["$kitchen.countryCode", 0]},
                    kitchenContactNo: {$arrayElemAt: ["$kitchen.contactNo", 0]},
                }
            }
        ]).sort(sort).skip(skip).limit(limit)

    },
    count: async (entry) => {
        const filter = {
            isDeleted: false,
            ...entry,
        };
        return await Cart.count(filter);
    },
    deleteOne: async (entry) => {
        return await Cart.updateOne(entry, {"$set": {isDeleted: true}}, {new: true})
    },

    findOneAndUpdate: async function (entry, fields, options = {}) {
        const filter = {
            isDeleted: false,
            ...entry,
        };
        return await Cart.findOneAndUpdate(filter, fields)
    },
    updateMany: async function (entry) {
        const filter = {
            isDeleted: false,
            ...entry,
        };
        return await Cart.updateMany(filter, {"$set": {isDeleted: true}})
    },
    findInternally: async function (filter) {
        return await Cart.find(filter, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, isDeleted: 0})
    },
};
