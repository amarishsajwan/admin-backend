const service = require('./admin.service');
const {errorResponse, successResponse} = require('../../utils/helpers');
module.exports = {
    createAccount: async (req, res, next) => {
        try {
            //const {userInfo: {_id} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.create(req.body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    getProfileView: async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.getProfileView(_id)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    resendVerifyEmail:async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.resendVerifyEmail(_id)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    updateProfileView: async (req, res, next) => {
        try {
            const {userInfo: {_id} = {}, body, files = []} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.updateProfileView(_id, body, files)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    updateFcmToken: async (req, res, next) => {
        try {
            const {userInfo: {token}, body} = req;
            await service.updateFcmToken(token, body);
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    changeContactNumber: async (req, res, next) => {
        try {
            const {body, userInfo: {_id}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.changeContactNumber(_id, body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    updateContactNumber: async (req, res, next) => {
        try {
            const {body, userInfo: {_id}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.updateContactNumber(_id, body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    verifyMail: async (req, res, next) => {
        try {
            const {params: {mailToken = null} = {}} = req;
            await service.verifyMail(mailToken);
            return successResponse(req, res, {
                message: "successfully"
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    verifyOtp: async (req, res, next) => {
        try {
            const {body} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.verifyOtp(body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    deleteAccount: async (req, res, next) => {
        try {
            const { userInfo: {_id}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.deleteAccount(_id)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    addToFavourite:async (req, res, next) => {
        try {
            const {body, userInfo: {_id}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.addToFavourite(_id, body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
};
