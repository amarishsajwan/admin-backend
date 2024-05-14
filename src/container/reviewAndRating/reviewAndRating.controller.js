const service = require('./reviewAndRating.service');
const {errorResponse, successResponse} = require('../../utils/helpers');

module.exports = {
    create: async (req, res, next) => {
        try {
            const { body, userInfo: {_id} = {}} = req
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.create( _id, body)
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
}