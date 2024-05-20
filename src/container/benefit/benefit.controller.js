const service = require("./benefit.service");
const { errorResponse, successResponse } = require("../../utils/helpers");
module.exports = {
  createBenefit: async (req, res, next) => {
    try {
      //const {userInfo: {_id} = {}} = req;
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.createBenefit(req.body),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
  updateBenefit: async (req, res, next) => {
    try {
      const { benefitInfo: { id } = {}, body } = req;
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.updateBenefit(id, body),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
  getBenefitList: async (req, res, next) => {
    try {
      return successResponse(req, res, {
        message: "successfully",
        payload: await service.getBenefitList(),
      });
    } catch (err) {
      return errorResponse(req, res, err);
    }
  },
};
