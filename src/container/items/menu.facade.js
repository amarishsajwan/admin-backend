const dbClient = require('../../connections/mongo');
const helpers = require('../../utils/helpers');


module.exports = {
    find: async (filters, options = {}, userId) => {
        let filter = {
            ...filters,
            status: 1,
            isDeleted: false
        }
        const {sort, limit, skip} = helpers.getFindParams(options);
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
        const db = await dbClient.getDb();
        let result = await db.collection('kitchens').aggregate([
            ...aggregateQuery,
            {
                $lookup:
                    {
                        from: "items",
                        localField: "_id",
                        foreignField: "kitchenId",
                        as: "items"
                    }
            },
            {"$project":{
                    items:1,
                    _id:0


                }},
            {"$unwind":"$items"},
            { $replaceRoot: { newRoot: "$items" } },
            {"$match": filter},
            {
                $lookup:
                    {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "category"
                    }
            },
            {
                $lookup: {
                    from: 'favourites',
                    let: {menuId: "$_id"},
                    pipeline: [
                        {
                            "$match": {
                                "$expr": {"$eq": ["$menuId", "$$menuId"]},
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
                    favouriteId: {$arrayElemAt: ["$favourites._id", 0]}
                }
            },
            {
                $facet: {
                    results: [{$sort: sort}, {$skip: skip}, {$limit: limit}],
                    count: [{$count: 'totalCount'}]
                }
            },
            {
                $project: {
                    results: 1,
                    totalCount: {$arrayElemAt: ["$count.totalCount", 0]},
                }
            }

        ]).toArray()
        if (result.length > 0) {
            return result[0]
        }
        return {
            results: [],
            totalCount: 0
        }
    },
    updateMany: async (entry, fields) => {
        const db = await dbClient.getDb();
        return await db.collection('items').updateMany(entry, {"$set": fields})
    },
    count: async (filter) => {
        const db = await dbClient.getDb();
        return await db.collection('items').countDocuments(filter);
    },
    categoryList: async function (filters, options = {}) {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        const db = await dbClient.getDb();
        const {sort, limit, skip} = helpers.getFindParams(options);

        let [{results, totalCount}] = await db.collection('categories').aggregate([
            {$match: filter},
            {
                $facet: {
                    results: [{$sort: sort}, {$skip: skip}, {$limit: limit}],
                    count: [{$count: 'totalCount'}]
                }
            },
            {
                $project: {
                    results: 1,
                    totalCount: {$arrayElemAt: ["$count.totalCount", 0]},
                }
            }]).toArray();


        return {results, totalCount}
    },
    findOne: async (filters, userId) => {
        const filter = {
            ...filters,
        };
        const db = await dbClient.getDb();
        let data = await db.collection('items').aggregate([
            {"$match": filter},
            {
                $lookup:
                    {
                        from: "categories",
                        localField: "categoryId",
                        foreignField: "_id",
                        as: "category"
                    }
            },
            {
                $lookup:
                    {
                        from: "sub-categories",
                        localField: "subCategoryId",
                        foreignField: "_id",
                        as: "subcategory"
                    }
            },
            {
                $lookup: {
                    from: 'favourites',
                    let: {menuId: "$_id"},
                    pipeline: [
                        {
                            "$match": {
                                "$expr": {"$eq": ["$menuId", "$$menuId"]},
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
                    favouriteId: {$arrayElemAt: ["$favourites._id", 0]}
                }
            },
            {
                $lookup:
                    {
                        from: "addongroups",
                        localField: "addOnGroupId",
                        foreignField: "_id",
                        as: "addOnGroup"
                    }
            },
            {"$unwind": "$addOnGroup"},
            {
                $lookup:
                    {
                        from: "addonitems",
                        localField: "addOnGroup.addOnItemIds",
                        foreignField: "_id",
                        as: "addOnItems"
                    }
            },
            {
                $addFields: {
                    categoryTitle: {$arrayElemAt: ["$category.title", 0]},
                    subcategoryTitle: {$arrayElemAt: ["$subcategory.title", 0]},
                    addOnGroupId: "$addOnGroup._id",
                    addOnGroupTitle: "$addOnGroup.title",
                    minItemRange: "$addOnGroup.minItemRange",
                    maxItemRange: "$addOnGroup. maxItemRange",
                }
            },
            {
                $project: {
                    subcategory: 0,
                    category: 0,
                    addOnGroup: 0
                }
            },

        ]).toArray()
        return data.length > 0 ? data[0] : {}
    },
    distinct: async (key, filter) => {
        const db = await dbClient.getDb();
        return await db.collection('items').distinct(key, filter);
    },
    distinctCategory: async (key, filter) => {
        const db = await dbClient.getDb();
        return await db.collection('categories').distinct(key, filter);
    },
};
