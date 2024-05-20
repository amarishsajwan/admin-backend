const Benefit = require("./degree.model");

module.exports = {
  create: async (fields) => {
    const entryToInsert = {
      ...fields,
    };
    return await Benefit.create(entryToInsert);
  },

  update: async function (entry, fields, options = {}) {
    return await Benefit.update(fields, { where: entry });
  },
  findAll: async function () {
    return await Benefit.findAll();
  },
};
