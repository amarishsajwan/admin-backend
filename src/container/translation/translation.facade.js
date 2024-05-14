const dbClient = require('../../connections/mongo');

module.exports = {
    findOne: async (filters) => {
        const db = await dbClient.getDb();
        return await db.collection('translations').findOne({
            ...filters,
            "type": "CUSTOMER"
        })
    }
};