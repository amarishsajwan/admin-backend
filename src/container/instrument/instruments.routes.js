const express = require('express');
const router = express.Router();
const controller = require('./instruments.controller');

router.route('/')
    .post(controller.create)
    .get(controller.find);
/**
 * @swagger
 *
 * /api/v1/instruments:
 *  post:
 *    tags:
 *        - instruments
 *    summary: "Add instruments"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: token
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: isDefault
 *         type: boolean
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
 *  get:
 *    tags:
 *        - instruments
 *    summary: "Get instrumentss List"
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
router.route('/:id')
    .delete(controller.delete)
/**
 * @swagger
 *
 * /api/v1/instruments/{id}:
 *  delete:
 *    tags:
 *        - instruments
 *    summary: "Delete instruments"
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
