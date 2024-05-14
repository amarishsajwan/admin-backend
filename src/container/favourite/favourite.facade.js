const Favourite = require('./favourite.model');
const helpers = require('../../utils/helpers');


module.exports = {
    insertOne: async (fields) => {
        const entryToInsert = {
            ...fields,
            isDeleted: false
        };
        return await new Favourite(entryToInsert).save();

    },
    find: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        const {sort, limit, skip} = helpers.getFindParams(options);
        return await Favourite.find(filter).sort(sort).skip(skip).limit(limit)

    },
    findOne: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        return await Favourite.findOne(filter);

    },
    deleteOne: async (entry) => {
        return await Favourite.updateOne(entry, {"$set": {isDeleted: true}}, {new: true})
    },
    findFavouriteKitchen: async (filter, options = {}) => {
        const {limit, skip} = helpers.getFindParams(options);


        return await Favourite.aggregate([{"$match": filter},
            {
                $lookup: {
                    from: 'kitchens',
                    let: {kitchenId: "$kitchenId", favouriteId: "$_id"},
                    pipeline: [
                        {
                            "$match": {
                                "$expr": {"$eq": ["$_id", "$$kitchenId"]},
                            }
                        },
                        {
                            "$lookup": {
                                from: "cuisines",
                                localField: "cuisinesIds",
                                foreignField: "_id",
                                as: "cuisines"
                            }
                        },
                        {$addFields: {favouriteId: "$$favouriteId"}}
                    ],
                    as: "kitchens"
                }
            },

            {
                $replaceRoot: {
                    newRoot: {
                        $ifNull: [{$arrayElemAt: ["$kitchens", 0]}, "$$ROOT"]
                    }
                }
            }, {
                "$match": {status: 1, isDeleted: false}
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
                "$addFields": {
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
                    results: [{$sort: {_id: -1}}, {$skip: skip}, {$limit: limit}],
                    count: [{$count: 'totalCount'}]
                }
            }
        ]).sort({_id: -1}).skip(skip).limit(limit);
    },
    findFavouriteMenu: async (filter, options = {}) => {
        const {limit, skip} = helpers.getFindParams(options);

        return await Favourite.aggregate([{"$match": filter},
            {
                $lookup: {
                    from: 'items',
                    let: {menuId: "$menuId", favouriteId: "$_id"},
                    pipeline: [
                        {
                            "$match": {
                                "$expr": {"$eq": ["$_id", "$$menuId"]},
                                isDeleted: false
                            }
                        },
                        {
                            $lookup:
                                {
                                    from: "categories",
                                    localField: "categoryId",
                                    foreignField: "_id",
                                    as: "category"
                                }
                        },
                        {$addFields: {favouriteId: "$$favouriteId"}}
                    ],
                    as: "kitchens"
                }
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $ifNull: [{$arrayElemAt: ["$kitchens", 0]}, "$$ROOT"]
                    }
                }
            },
            {
                $facet: {
                    results: [{$sort: {_id: -1}}, {$skip: skip}, {$limit: limit}],
                    count: [{$count: 'totalCount'}]
                }
            }
        ]).sort({_id: -1}).skip(skip).limit(limit);
    }
};

