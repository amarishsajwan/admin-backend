const express = require('express');
const router = express.Router();
const controller = require('./session.controller');
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

module.exports = router;
