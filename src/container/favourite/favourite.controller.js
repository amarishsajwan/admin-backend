const service = require('./favourite.service');
const {errorResponse, successResponse} = require('../../utils/helpers');
module.exports = {
    addToFavouriteKitchen: async (req, res, next) => {
        try {
            const {userInfo: {_id: userId} = {}, body} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.addToFavouriteKitchen(userId, body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    favouriteKitchenList: async (req, res, next) => {
        try {
            const {query = {}, userInfo: {_id: userId} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.favouriteKitchenList(userId, query)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    addToFavouriteMenu: async (req, res, next) => {
        try {
            const {userInfo: {_id: userId} = {}, body} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.addToFavouriteMenu(userId, body)
            });
        } catch (err) {
            return errorResponse(req, res, err);
        }
    },
    favouriteMenuList: async (req, res, next) => {
        try {
            const {query = {}, userInfo: {_id: userId} = {}} = req;
            return successResponse(req, res, {
                message: "successfully",
                payload: await service.favouriteMenuList(userId, query)
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
