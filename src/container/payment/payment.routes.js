const express = require('express');
const router = express.Router();
const controller = require('./payment.controller');

router.route('/')
    .post(controller.create)
/**
 * @swagger
 *
 * /api/v1/payment:
 *  post:
 *    tags:
 *        - Payment
 *    summary: "Payment with card token"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: cartToken
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



router.post('/notify', function (req, res) {
    console.log("posy notify",req.body)
})

router.get('/notify', function (req, res) {
    console.log("get notify",)

})

router.route('/card_list')
    .get(controller.cardList)

/**
 * @swagger
 *
 * /api/v1/payment/card_list:
 *  get:
 *    tags:
 *        - Payment
 *    summary: " card list"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: cartToken
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