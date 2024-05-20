const Category = require("./category.model");

module.exports = {
  create: async (fields) => {
    const entryToInsert = {
      ...fields,
    };
    return await Category.create(entryToInsert);
  },

  update: async function (entry, fields, options = {}) {
    return await Category.update(fields, { where: entry });
  },
  findAll: async function () {
    return await Category.findAll();
  },
};
