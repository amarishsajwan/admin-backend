const dbClient = require('../../connections/mongo');
const helpers = require('../../utils/helpers');

module.exports = {
    find: async (filters, options = {}) => {
        const {sort, limit, skip} = helpers.getFindParams(options);
        const db = await dbClient.getDb();
        return await  db.collection('customer_notifications').find(filters).sort(sort).skip(skip).limit(limit).toArray()
    },
    updateMany: async (entry, fields) => {
        const db = await dbClient.getDb();
        return await  db.collection('customer_notifications').updateMany(entry, {"$set": fields})
    },
    count: async (filter) => {
        const db = await dbClient.getDb();
        return await  db.collection('customer_notifications').countDocuments(filter);
    },
    findOne: async (filters, options = {}) => {
        const filter = {
            isDeleted: false,
            ...filters,
        };
        const db = await dbClient.getDb();
        return await  db.collection('customer_notifications').findOne(filter);

    },
    deleteOne: async (entry) => {
        const db = await dbClient.getDb();
        return await  db.collection('customer_notifications').updateOne(entry, {"$set": {isDeleted: true}})
    },
};
