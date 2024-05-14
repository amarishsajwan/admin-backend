const {ObjectId} = require('mongodb');
const jwt = require('jsonwebtoken');
const constants = require('./constants');
const STATUS_CODES = require('./statusCodes');
const bcrypt = require('bcryptjs');
const translationFacade = require('../container/translation/translation.facade')

module.exports = {
    hashPassword(password) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    comparePassword(hashPassword, userPassword){
        return  bcrypt.compareSync(userPassword, hashPassword)
    },
    generateToken(params, tokenType = 'access'){
        const secretKey =  constants.ACCESS_TOKEN_SECRET_KEY;
        return jwt.sign(params, secretKey);
    },
    verifyToken(token, tokenType = 'access'){
        const secretKey =  constants.ACCESS_TOKEN_SECRET_KEY;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) return false;
            return decoded;
        });
    },
    isValidMongoId(id) {
        return ObjectId.isValid(id)
    },
    getFindParams(options = {}, defaultSortOn = 'createdAt') {
        let {sort = null, page = 1, limit = 50} = options;

        if (!Number.isInteger(limit)) limit = parseInt(limit);

        const skip = (page - 1) * limit;
        const sortBy = sort ? (sort[0] == '-' ? -1 : 1) : -1
        const sortOn = sort ? (sort[0] == '-' ? sort.slice(1) : sort) : defaultSortOn

        return {
            sort: {[sortOn]: sortBy},
            limit,
            skip
        }
    },
    getUserTokens: function (userId, contact) {
        return jwt.sign(userId.toString() + contact + Date.now(), 'sceret')
    },
    generateOtp: function () {
        return Math.floor(1000 + Math.random() * 9000)
    },
    getRandomString: function () {
        return (Math.random().toString(36) + '0000000000').slice(2, 10 + 2)
    },

    successResponse: (req, res, body) => {
        const {message = 'success', payload = {}} = body;
        return res.status(STATUS_CODES.OK).json({success: true, message, payload})
    },
    errorResponse: async (req, res, err) => {
        const {headers: {ln = 'en'} = {}} = req;
        let message = err.statusCode ? err.message : 'internal_error';
        let result = await translationFacade.findOne({slug: message});
        if (result) message = result['message'][ln] ? result['message'][ln] : result['message']['en'] ? result['message']['en'] : message;
        if (err.statusCode) {
            return res.status(err.statusCode).json({success: false, message});
        }
        console.error(err);
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success: false, message});
    }
};
