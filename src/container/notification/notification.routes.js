const express = require('express');
const router = express.Router();
const controller = require('./notification.controller');

router.route('/')
    .get(controller.find)

/**
 * @swagger
 *
 * /api/v1/notification:
 *  get:
 *    tags:
 *        - Notifications
 *    summary: "Notification list"
 *    parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         minimum: 1
 *         description: minimum value 1
 *         required: false
 *
 *       - in: query
 *         name: limit
 *         type: integer
 *         minimum: 10
 *         maximum: 100
 *         description: minimum value 1 and maximum value 100
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
 *    security:
 *       - bearerAuth: []
 */


router.route('/status-update')
    .post(controller.update)

/**
 * @swagger
 *
 * /api/v1/notification/status-update:
 *  post:
 *    tags:
 *        - Notifications
 *    summary: "Update Notifications Status"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: notificationIds
 *         type: array
 *         items:
 *            type: string
 *         description:  array of ids
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

router.route('/:id')
    .delete(controller.delete)
    .get(controller.findOne)

/**
 * @swagger
 *
 * /api/v1/notification/{id}:
 *  get:
 *    tags:
 *        - Notifications
 *    summary: "Get Notifications"
 *    parameters:
 *       - in: path
 *         name: id
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
 *  delete:
 *    tags:
 *        - Notifications
 *    summary: "Delete Notifications"
 *    parameters:
 *       - in: path
 *         name: id
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





module.exports = router;
