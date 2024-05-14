const service = require('./order.service');
const {errorResponse, successResponse} = require('../../utils/helpers');
module.exports = {
    create: async (req, res, next) => {
        try {
            const {userInfo, body} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.create(userInfo, body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    find: async (req, res, next) => {
        try {
            const {query = {}, userInfo: {_id} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.find( _id, query)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    delete: async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}, params: {id}} = req

            await service.delete(_id, id)
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    addReview: async (req, res, next) => {
        try {
            const { params: {id}, body, userInfo: {_id} = {}} = req
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.addReview( id,_id, body)
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
    }
};
