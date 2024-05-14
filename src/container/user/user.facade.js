const User = require('./user.model')

module.exports = {
    findOne: async function (entry) {
        return await User.findOne({...entry, isDeleted: false})
    },
    update: async function (entry, fields, options = {}) {
        return await User.updateOne(entry, fields)
    },
    insertOne: async (fields) => {
        const entryToInsert = {
            ...fields,
            isDeleted: false,
            isActive: false,
            isVerifiedEmail: false,
            isRegister: false
        };
        return await new User(entryToInsert).save();
    },
};
