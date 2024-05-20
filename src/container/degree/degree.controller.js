const service = require("./degree.service");
const { errorResponse, successResponse } = require("../../utils/helpers");
module.exports = {
  createDegree: async (req, res, next) => {
    try {
      //const {userInfo: {_id} = {}} = req;
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.createDegree(req.body),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
  updateDegree: async (req, res, next) => {
    try {
      const { benefitInfo: { id } = {}, body } = req;
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.updateDegree(id, body),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
  getDegreeList: async (req, res, next) => {
    try {
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.getDegreeList(),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
};
