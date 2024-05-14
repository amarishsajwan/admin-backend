const service = require('./session.service');
const {errorResponse, successResponse} = require('../../utils/helpers');
module.exports = {
    login: async (req, res, next) => {
        try {
            const {body} = req;
            return successResponse(req, res, {
                    message: "successfully",
                    payload: await service.login(body)
                }
            );
        } catch (err) {
            return errorResponse(req, res, err)
        }
    },
    logout: async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}, headers: {authorization}} = req;
            await service.logout(_id, authorization);
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err)
        }
    },
    otpLogin: async (req, res, next) => {
        try {
            const {body = {}} = req;
            await service.otpLogin(body);
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err)
        }
    },
};
