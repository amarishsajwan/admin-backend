const Admin = require('./admin.model')

module.exports = {
    findOne: async function (entry) {
        return await Admin.findOne({ where: { ...entry} });
    },
    update: async function (entry, fields, options = {}) {
        return await Admin.update(fields, { where: entry });
    },
    create: async (fields) => {
        const entryToInsert = {
            ...fields,
        };
        return await Admin.create(entryToInsert);
    },
};
