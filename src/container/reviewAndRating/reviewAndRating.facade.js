const reviewAndRating = require('./reviewAndRating.model');
const helpers = require('../../utils/helpers');
module.exports = {

    insertOne: async (fields) => {
        const entryToInsert = {
            ...fields,
            isDeleted: false
        };
        return await new reviewAndRating(entryToInsert).save();
    },
    find: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        const {limit, skip} = helpers.getFindParams(options);
        return await reviewAndRating.find(filter).populate('orderBy', {
            name: 1,
            profile_image: 1,
            _id: 0
        }).sort({createdAt: -1}).skip(skip).limit(limit)

    },
    count: async (entry) => {
        const filter = {
            isDeleted: false,
            ...entry,
        };
        return await reviewAndRating.count(filter);
    },
};
