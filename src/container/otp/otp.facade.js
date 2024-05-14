const Otp = require('./otp.model');
module.exports = {
    findOne: async (entry) => {
        return await Otp.findOne({...entry, verified: false}).sort({"createdAt":-1})
    },
    insertOne: async (fields) => {
        let createToField = {
            ...fields,
            verified: false
        };
        return await new Otp(createToField).save();
    },
    update: async (entry, fields) => {
        return await Otp.updateOne(entry, {"$set": fields})
    },
    updateMany: async (entry, fields) => {
        return await Otp.updateMany(entry,  fields, {new: true})
    },
};
