const express = require('express');
const router = express.Router();
const controller = require('./session.controller');
const {jwtTokenVerify} = require('../../middleware/authorize');

router.route('/login')
    .post(controller.login)

/**
 * @swagger
 *
 * /api/v1/session/login:
 *  post:
 *    tags:
 *        - Session
 *    summary: "session login"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: country_code
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: contact_no
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: otp
 *         type: string
 *         required: true
 *
 *
 *       - in: formData
 *         name: device_id
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: platform
 *         type: string
 *         required: true
 *         enum: [IOS, ANDROID]
 *
 *       - in: formData
 *         name: app_version
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: device_token
 *         type: string
 *         required: false
 *    responses:
 *       '200':
 *         description: SUCCESS
 *       '400':
 *         description: BAD REQUEST
 *       '401':
 *         description: UNAUTHORIZED
 *       '500':
 *         description: INTERNAL SERVER ERROR
 */


router.route('/otp')
    .post(controller.otpLogin);
/**
 * @swagger
 *
 * /api/v1/session/otp:
 *  post:
 *    tags:
 *        - Session
 *    summary: "Get login otp"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: country_code
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: contact_no
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: platform
 *         type: string
 *         required: true
 *         enum: [IOS, ANDROID]
 *
 *    responses:
 *       '200':
 *         description: SUCCESS
 *       '400':
 *         description: BAD REQUEST
 *       '401':
 *         description: UNAUTHORIZED
 *       '500':
 *         description: INTERNAL SERVER ERROR
 */


router.route('/logout')
    .get(jwtTokenVerify, controller.logout);

/**
 * @swagger
 *
 * /api/v1/session/logout:
 *  get:
 *    tags:
 *        - Session
 *    summary: "session logout"
 *    responses:
 *       '200':
 *         description: SUCCESS
 *       '400':
 *         description: BAD REQUEST
 *       '401':
 *         description: UNAUTHORIZED
 *       '500':
 *         description: INTERNAL SERVER ERROR
 *    security:
 *       - bearerAuth: []
 */

module.exports = router;
