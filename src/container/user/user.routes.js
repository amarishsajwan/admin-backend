const express = require('express');
const router = express.Router();
const s3Client = require('../../utils/s3Client');
const controller = require('./user.controller');
const {jwtTokenVerify, jwtGuestTokenVerify} = require('../../middleware/authorize');


router.route('/delete-account').delete(jwtTokenVerify, controller.deleteAccount);
/**
 * @swagger
 *
 * /api/v1/customer/delete-account:
 *  delete:
 *    tags:
 *        - Customer
 *    summary: "delete user account"
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

router.route('/verify/:mailToken/email').get(controller.verifyMail);

router.route('/profile-view').get(jwtTokenVerify, controller.getProfileView);
/**
 * @swagger
 *
 * /api/v1/customer/profile-view:
 *  get:
 *    tags:
 *        - Customer
 *    summary: "profile view"
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
 *    security:
 *       - bearerAuth: []
 */

router.route('/edit-profile').post(jwtTokenVerify, s3Client.uploadFile, controller.updateProfileView);
/**
 * @swagger
 *
 * /api/v1/customer/edit-profile:
 *  post:
 *    tags:
 *        - Customer
 *    summary: "edit profile"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: email
 *         type: string
 *         required: false
 *
 *
 *       - in: formData
 *         name: profile_image
 *         type: file
 *         required: false
 *
 *
 *       - in: formData
 *         name: dob
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: gender
 *         type: string
 *         required: false
 *         enum: [male, female, other]
 *
 *       - in: formData
 *         name: name
 *         type: string
 *         required: false
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
 *    security:
 *       - bearerAuth: []
 */

router.route('/fcm-token').put(jwtGuestTokenVerify, controller.updateFcmToken)
/**
 * @swagger
 *
 * /api/v1/customer/fcm-token:
 *  put:
 *    tags:
 *        - Customer
 *    summary: "update fcm token"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: deviceToken
 *         type: string
 *         required: true
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

router.route('/change-mobile-number').post(jwtTokenVerify, controller.changeContactNumber)
/**
 * @swagger
 *
 * /api/v1/customer/change-mobile-number:
 *  post:
 *    tags:
 *        - Customer
 *    summary: "edit mobile number"
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
 *    security:
 *       - bearerAuth: []
 */

router.route('/update-mobile-number').post(jwtTokenVerify, controller.updateContactNumber)
/**
 * @swagger
 *
 * /api/v1/customer/update-mobile-number:
 *  post:
 *    tags:
 *        - Customer
 *    summary: "update mobile number"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: otp
 *         type: string
 *         required: true
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


router.route('/verify-otp').post(controller.verifyOtp)
/**
 * @swagger
 *
 * /api/v1/customer/verify-otp:
 *  post:
 *    tags:
 *        - Customer
 *    summary: "verify otp"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *
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
 *       - in: formData
 *         name: type
 *         type: string
 *         required: true,
 *         enum: [register, passwordReset, changeContact]
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

router.route('/resend-verify-mail').get(jwtTokenVerify, controller.resendVerifyEmail);
/**
 * @swagger
 *
 * /api/v1/customer/resend-verify-mail:
 *  get:
 *    tags:
 *        - Customer
 *    summary: "resend email option"
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
 *    security:
 *       - bearerAuth: []
 */

router.route('/favourite').post(jwtTokenVerify,controller.addToFavourite);
/**
 * @swagger
 *
 * /api/v1/customer/favourite:
 *  post:
 *    tags:
 *        - Customer
 *    summary: "add favourite to customer list"
 *    parameters:
 *       - in: formData
 *         name: menuId
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: kitchenId
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: isFavourite
 *         type: boolean
 *         required: true
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
