const { ObjectId } = require("mongodb");
const facade = require("./degree.facade");
const exceptionHandler = require("../../utils/exceptionHandler");
const validator = require("./degree.validator");
const helpers = require("../../utils/helpers");
const mailClient = require("../../utils/mailClient");

module.exports = {
  createDegree: async (data) => {
    const { error } = validator.validateToCreate(data);
    if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);
    return await facade.create(data);
  },

  updateDegree: async (id, fields) => {
    const { error } = validator.validateToUpdate(fields);
    if (error) exceptionHandler.throwError("invalid_" + error.details[0].path);

    const updatedResponse = await facade.update({ id }, fields);
    if (updatedResponse.nModified != 1) {
      return exceptionHandler.throwError();
    }

    return updatedResponse;
  },
  getDegreeList: async () => {
    return await facade.findAll();
  },
};
