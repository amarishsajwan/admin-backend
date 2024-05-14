const { MongoClient } = require('mongodb');
const constants = require('../utils/constants')

let client;
module.exports= {
    getClient: async function () {
        if (!client) {
            client = MongoClient.connect(constants.BASE_MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        }
        return client
    },
    getDb: async function (dbName = constants.BASE_DATABASE) {
        const dbClient = await this.getClient()
        return dbClient.db(dbName)
    },
    isConnected: () => {
        return client ? client.isConnected() : false
    }
}
