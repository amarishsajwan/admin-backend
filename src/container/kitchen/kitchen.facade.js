const dbClient = require('../../connections/mongo');
const helpers = require('../../utils/helpers');


module.exports = {
    find: async (filters, options = {}) => {
        const {sort, limit, skip} = helpers.getFindParams(options);
        const db = await dbClient.getDb();
        return await db.collection('kitchens').find(filters, {}).sort(sort).skip(skip).limit(limit).toArray()
    },
    updateMany: async (entry, fields) => {
        const db = await dbClient.getDb();
        return await db.collection('kitchens').updateMany(entry, {"$set": fields})
    },
    count: async (filter) => {
        const db = await dbClient.getDb();
        return await db.collection('kitchens').countDocuments(filter);
    },
    findOne: async (filter) => {
        const db = await dbClient.getDb();
        return await db.collection('kitchens').findOne(filter);
    },
    findWithAggregate: async function (entry, options = {}, userId) {

        let filter = {
            ...entry,
            status: 1,
            isDeleted: false,
        };
        let aggregateQuery = []
        const {longitude, latitude} = options;
        if (longitude && latitude) {
            aggregateQuery = [{
                "$geoNear": {
                    "near": {
                        "type": "Point",
                        "coordinates": [parseFloat(latitude), parseFloat(longitude)]
                    },
                    "spherical": true,
                    "maxDistance": 100000,
                    "distanceField": "distance",
                    "distanceMultiplier": 0.001
                }
            }];
        }
        aggregateQuery.push({"$match": filter});
        const {sort, limit, skip} = helpers.getFindParams(options);
        const db = await dbClient.getDb();
        return await db.collection('kitchens').aggregate([
            ...aggregateQuery,
            {"$match": filter},
            {
                "$lookup": {
                    from: "categories",
                    localField: "cuisinesIds",
                    foreignField: "_id",
                    as: "cuisines"
                }
            },
            {
                "$lookup": {
                    from: "reviewandratings",
                    localField: "_id",
                    foreignField: "kitchenId",
                    as: "reviewAndRating"
                }
            },
            {
                $lookup: {
                    from: 'favourites',
                    let: {id: "$_id"},
                    pipeline: [
                        {
                            "$match": {
                                "$expr": {"$eq": ["$kitchenId", "$$id"]},
                                userId,
                                isDeleted: false
                            }
                        }
                    ],
                    as: "favourites"
                }
            },
            {
                "$addFields": {
                    favouriteId: {$arrayElemAt: ["$favourites._id", 0]},
                    totalRating: {$sum: "$reviewAndRating.rating"} || 0,
                    noOfRating: {$size: "$reviewAndRating"} || 0
                }
            },
            {
                "$project": {
                    reviewAndRating: 0
                }
            },
            {
                $facet: {
                    results: [{$sort: {"distance": 1, "createdAt": -1}}, {$skip: skip}, {$limit: limit}],
                    count: [{$count: 'totalCount'}]
                }
            }
        ]).toArray();

    },
    findWithAggregateOne: async function (entry, options = {}, userId) {

        let filter = {
            ...entry,
            status: 1,
            isDeleted: false,
        };
        const {sort, limit, skip} = helpers.getFindParams(options);
        const db = await dbClient.getDb();
        return await db.collection('kitchens').aggregate([
            {"$match": filter},
            {
                "$lookup": {
                    from: "categories",
                    localField: "cuisinesIds",
                    foreignField: "_id",
                    as: "cuisines"
                }
            },
            {
                "$lookup": {
                    from: "reviewandratings",
                    localField: "_id",
                    foreignField: "kitchenId",
                    as: "reviewAndRating"
                }
            },
            {
                $lookup: {
                    from: 'favourites',
                    let: {id: "$_id"},
                    pipeline: [
                        {
                            "$match": {
                                "$expr": {"$eq": ["$kitchenId", "$$id"]},
                                userId,
                                isDeleted: false
                            }
                        }
                    ],
                    as: "favourites"
                }
            },
            {
                "$addFields": {
                    favouriteId: {$cond: [{$setIsSubset: [[userId], "$favourites.userId"]}, {$arrayElemAt: ["$favourites._id", 0]}, null]},//{$arrayElemAt: ["$favourites._id", 0]},
                    totalRating: {$sum: "$reviewAndRating.rating"} || 0,
                    noOfRating: {$size: "$reviewAndRating"} || 0,
                    noOfFavourites: {$size: "$favourites"} || 0
                }
            },
            {
                "$project": {
                    reviewAndRating: 0,
                    favourites: 0
                }
            },
        ]).toArray();
    },

    createOrderId: async function (entry) {
        const db = await dbClient.getDb();
        let {value: {shareId, orderNumber} = {}} = await db.collection('kitchens').findOneAndUpdate(entry, {$inc: {orderNumber: 1}}, {new: true}) || {}
        return shareId +"-"+ orderNumber
    },
}
;
