const service = require('./payment.service');
const {errorResponse, successResponse} = require('../../utils/helpers');

module.exports = {

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
    cardList: async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.cardList(_id)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
};
