const Token = require('./token.model')

module.exports = {
    update: async function (entry, fields, options = {}) {
        let existingToken = await Token.findOne(entry)
        if (existingToken) {
            await Token.updateOne(entry, {$set: fields})
        } else
            await new Token({...entry, ...fields}).save();
        return {nModified: 1}
    },
    logout: async function (entry) {
        return await Token.deleteOne(entry)
    },
    findOne: async function (entry) {
        return await Token.findOne(entry);
    },
    updateMany: async (entry, fields) => {
        return await Token.updateMany(entry, fields, {new: true})
    },
    updateOne: async function (entry, fields, options = {}) {
        return await Token.updateOne(entry, {$set: fields})
    },
}
