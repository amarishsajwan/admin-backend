const express = require('express');
const router = express.Router();
const controller = require('./kitchen.controller');
const {addUserInfo} = require('../../middleware/authorize')

router.route('/')
    .get(addUserInfo, controller.find)

/**
 * @swagger
 *
 * /api/v1/kitchen:
 *  get:
 *    tags:
 *        - Kitchen
 *    summary: "Kitchen list"
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
 *
 *
 *       - in: query
 *         name: categoryOrCuisinesId
 *         type: string
 *         required: false
 *
 *       - in: query
 *         name: type
 *         type: number
 *         required: false
 *
 *
 *       - in: query
 *         name: latitude
 *         type: number
 *         required: false
 *
 *       - in: query
 *         name: longitude
 *         type: number
 *         required: false
 *
 *       - in: query
 *         name: searchString
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
 *    security:
 *       - bearerAuth: []
 */



router.route('/:id').get(addUserInfo, controller.findOne);
/**
 * @swagger
 *
 * /api/v1/kitchen/{id}:
 *  get:
 *    tags:
 *        - Kitchen
 *    summary: "Kitchen details"
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

router.route('/info/:shareId').get(controller.shareKitchenInfo)
/**
 * @swagger
 *
 * /api/v1/kitchen/info/{shareId}:
 *  get:
 *    tags:
 *        - Kitchen
 *    summary: "kitchen details for share link "
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: path
 *         name: shareId
 *         type: string
 *         required: true
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









module.exports = router;
