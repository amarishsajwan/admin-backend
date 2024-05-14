const express = require('express');
const router = express.Router();
const controller = require('./cart.controller');

router.route('/')
    .post(controller.create)
    .get(controller.find);
/**
 * @swagger
 *
 * /api/v1/cart:
 *  post:
 *    tags:
 *        - Cart
 *    summary: "Add item to cart"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: itemId
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: kitchenId
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: itemImage
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: itemName
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: description
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: packageType
 *         type: string
 *         required: false
 *         description: its like small, medium, half, full
 *
 *       - in: formData
 *         name: price
 *         type: number
 *         required: true
 *
 *       - in: formData
 *         name: addOnItemIds
 *         type: array
 *         items:
 *            type: string
 *         required: false
 *
 *       - in: formData
 *         name: quantity
 *         type: number
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
 *        - Cart
 *    summary: "cart List"
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

 *       - in: query
 *         name: customerAddressId
 *         type: string
 *         required: false

 *       - in: query
 *         name: latitude
 *         type: number
 *         required: false
 *
 *       - in: query
 *         name: longitude
 *         type: number
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

router.route('/past-order')
    .post(controller.createFromPastOrder)
/**
 * @swagger
 *
 * /api/v1/cart/past-order:
 *  post:
 *    tags:
 *        - Cart
 *    summary: "Add item to cart from old order"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: orderId
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


router.route('/:id')
    .delete(controller.delete)
    .put(controller.update)
/**
 * @swagger
 *
 * /api/v1/cart/{id}:
 *  put:
 *    tags:
 *        - Cart
 *    summary: "edit cart"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: price
 *         type: number
 *         required: true
 *
 *       - in: formData
 *         name: addOnItemIds
 *         type: array
 *         items:
 *            type: string
 *         required: false
 *
 *       - in: formData
 *         name: quantity
 *         type: number
 *         required: true
 *
 *       - in: formData
 *         name: packageType
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
 *  delete:
 *    tags:
 *        - Cart
 *    summary: "Delete item from cart"
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