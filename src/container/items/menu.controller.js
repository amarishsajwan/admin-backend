const service = require('./menu.service');
const {errorResponse, successResponse} = require('../../utils/helpers');
module.exports = {
    update: async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}, body} = req;
            await service.updateMany(_id, body);
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    find: async (req, res, next) => {
        try {
            const {query = {}, userInfo = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.find(userInfo, query)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    categoryList: async (req, res, next) => {
        try {
            const {query = {}, userInfo: {_id = null} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.categoryList(_id, query)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    findOne: async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}, params: {id}} = req

            return successResponse(req, res, {
                message: "successfully",
                payload: await service.findOne(_id, id)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
};
