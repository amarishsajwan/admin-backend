const express = require('express');
const router = express.Router();
const controller = require('./order.controller');


router.route('/')
    .post( controller.create)
    .get( controller.find);
/**
 * @swagger
 *
 * /api/v1/order:
 *  post:
 *    tags:
 *        - Order
 *    summary: "create order"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: kitchenId
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: totalPrice
 *         type: number
 *         required: true
 *
 *       - in: formData
 *         name: addressId
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: address
 *         type: object
 *
 *       - in: formData
 *         name: isPreOrder
 *         type: boolean
 *
 *       - in: formData
 *         name: preOrderTime
 *         type: number
 *
 *       - in: formData
 *         name: paymentMode
 *         type: string
 *
 *       - in: formData
 *         name: cardToken
 *         type: string
 *
 *       - in: formData
 *         name: cardId
 *         type: string
 *
 *       - in: formData
 *         name: cartIds
 *         type: array
 *         items:
 *            type: string
 *
 *       - in: formData
 *         name: items
 *         type: array
 *         items:
 *            type: object
 *            properties:
 *              itemImage:
 *                type: string
 *              itemName:
 *                type: string
 *              description:
 *                type: string
 *              packageType:
 *                type: object
 *              quantity:
 *                type: number
 *              addOnItemIds:
 *                type: array
 *                items:
 *                  type: string
 *              price:
 *                type: number
 *
 *
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
 *        - Order
 *    summary: "order List"
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


router.route('/:id')
    .get(controller.findOne)
/**
 * @swagger
 *
 * /api/v1/order/{id}:
 *  get:
 *    tags:
 *        - Order
 *    summary: "order details"
 *    parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
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

router.route('/add-review/:id')
    .post( controller.addReview)
/**
 * @swagger
 *
 * /api/v1/order/add-review/{id}:
 *  post:
 *    tags:
 *        - Order
 *    summary: "add review"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: path
 *         name: id
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