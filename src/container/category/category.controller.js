const service = require("./category.service");
const { errorResponse, successResponse } = require("../../utils/helpers");
module.exports = {
  createCategory: async (req, res, next) => {
    try {
      //const {userInfo: {_id} = {}} = req;
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.createCategory(req.body),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
  updateCategory: async (req, res, next) => {
    try {
      const { benefitInfo: { id } = {}, body } = req;
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.updateCategory(id, body),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
  getCategoryList: async (req, res, next) => {
    try {
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.getCategoryList(),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
};
