const service = require('./instruments.service');
const {errorResponse, successResponse} = require('../../utils/helpers');
module.exports = {
    create: async (req, res, next) => {
        try {
            const {userInfo: {_id: userId} = {}, body} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.create(userId, body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    find: async (req, res, next) => {
        try {
            const {query = {}, userInfo: {_id: userId} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.find(userId, query)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const {userInfo: {_id: userId} = {}, params: {id}} = req

            await service.delete(userId, id)
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    }
};
