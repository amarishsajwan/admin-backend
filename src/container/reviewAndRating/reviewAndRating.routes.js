const express = require('express');
const router = express.Router();
const controller = require('./reviewAndRating.controller');

router.route('/')
    .post( controller.create)
    .get( controller.find);
/**
 * @swagger
 *
 * /api/v1/review-rating:
 *  post:
 *    tags:
 *        - Review And Rating
 *    summary: "add  review"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: kitchenId
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: orderId
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: rating
 *         type: number
 *         required: true
 *
 *       - in: formData
 *         name: comment
 *         type: string
 *         required: false

 *
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
 *        - Review And Rating
 *    summary: "Review And Rating List"
 *    parameters:
 *       - in: query
 *         name: page
 *         type: integer
 *         minimum: 1
 *         description: minimum value 1
 *         required: false
 *
 *       - in: query
 *         name: kitchenId
 *         type: string
 *         required: true
 *
 *
 *       - in: query
 *         name: limit
 *         type: integer
 *         minimum: 10
 *         maximum: 100
 *         description: minimum value 1 and maximum value 100
 *         required: false
 *
 *       - in: query
 *         name: status
 *         type: string
 *
 *       - in: query
 *         name: search
 *         type: string
 *
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