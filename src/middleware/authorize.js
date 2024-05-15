// const tokenFacade = require('../container/token/token.facade');
// const userFacade = require('../container/user/user.facade');
// const {errorResponse, successResponse} = require('../utils/helpers');
// module.exports = {
//     jwtTokenVerify: async function (req, res, next) {
//         const token = req.headers.authorization;
//         if (!token) return errorResponse(req, res, {
//             "success": true,
//             statusCode: 401,
//             "message": "session_is_required",
//             "payload": {
//                 "auth_token": "unauthorized"
//             }
//         });
//         try {
//             const result = await tokenFacade.findOne({token});
//             if (!result) {
//                 return errorResponse(req, res, {
//                     statusCode: 401,
//                     "success": true,
//                     "message": "session_expired",
//                     "payload": {
//                         "auth_token": "unauthorized"
//                     }
//                 });
//             }

//             const user = await userFacade.findOne({_id: result.user_id});
//             if (!user) {
//                 return errorResponse(req, res, {
//                     statusCode: 401,
//                     "success": true,
//                     "message": "session_expired",
//                     "payload": {
//                         "auth_token": "unauthorized"
//                     }
//                 });
//             }
//             req.userInfo = user;
//             next();

//         } catch (ex) {
//             return errorResponse(req, res, ex)
//         }
//     },
//     jwtGuestTokenVerify: async function (req, res, next) {

//         const {type = null, app_version, device_id, authorization, platform} = req.headers;
//         if (!authorization) return successResponse(req, res, {
//             "success": true,
//             statusCode: 401,
//             "message": "session_is_required",
//             "payload": {
//                 "auth_token": "unauthorized"
//             }
//         });
//         req.userInfo={
//             token:authorization
//         }

//         try {
//             const result = await tokenFacade.findOne({token: authorization});
//             if (!result) {

//                 if (type && type === 'guest') {
//                     await tokenFacade.update({
//                         device_id
//                     }, {
//                         platform,
//                         token: authorization,
//                         login_type: 'GUEST',
//                         app_version
//                     })

//                 } else {
//                     return successResponse(req, res, {
//                         "success": true,
//                         "message": "session_expired",
//                         "payload": {
//                             "auth_token": "unauthorized"
//                         }
//                     });
//                 }
//             }

//             next();
//         } catch (ex) {
//             return errorResponse(req, res, ex)
//         }
//     },
//     addUserInfo: async function (req, res, next) {
//         const token = req.headers.authorization;
//         if (!token) return next;
//         try {
//             const result = await tokenFacade.findOne({token});
//             if (!result) {
//                 return next();
//             }

//             const user = await userFacade.findOne({_id: result.user_id});
//             if (!user) return next();

//             req.userInfo = user;
//             return next();

//         } catch (ex) {
//             return errorResponse(req, res, ex)
//         }
//     },
// };
