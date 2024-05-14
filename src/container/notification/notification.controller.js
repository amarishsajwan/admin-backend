const service = require('./notification.service');
const {errorResponse, successResponse} = require('../../utils/helpers');
module.exports = {
    update: async (req, res, next) => {
        try {
            const { userInfo={}, body} = req;
            await service.updateMany(userInfo, body);
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    find: async (req, res, next) => {
        try {
            const {query = {}, userInfo={}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.find(userInfo, query)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    findOne: async (req, res, next) => {
        try {
            const {userInfo={}, params: {id}, } = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.findOne( userInfo, id)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const {userInfo={}, params: {id}, } = req;
            await service.delete(userInfo, id)
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    }
};
