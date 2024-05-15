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
};
