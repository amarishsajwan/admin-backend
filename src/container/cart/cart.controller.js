const service = require('./cart.service');
const {errorResponse, successResponse} = require('../../utils/helpers');

module.exports = {
    createFromPastOrder: async (req, res, next) => {
    try {
        const {userInfo: {_id} = {}, body} = req;
        return successResponse(req, res, {
            message: "successfully",
            payload: await service.createFromPastOrder(_id, body)
        });
    } catch (err) {
        return errorResponse(req, res, err);
    }
},
    create: async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}, body} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.create(_id, body)
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
    update: async (req, res, next) => {
        try {
            const { params: {id}, body, userInfo: {_id} = {}} = req
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.update( id,_id, body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
};
