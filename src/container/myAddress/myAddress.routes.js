const express = require('express');
const router = express.Router();
const controller = require('./myAddress.controller');

router.route('/')
    .post(controller.create)
    .get(controller.find);
/**
 * @swagger
 *
 * /api/v1/addresses:
 *  post:
 *    tags:
 *        - My Addresses
 *    summary: "Add My Address"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: formData
 *         name: houseOrFlatNumber
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: landmark
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: type
 *         type: string
 *         required: true
 *         enum: [HOME, OFFICE, OTHER]
 *
 *       - in: formData
 *         name: fullAddress
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: customType
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: bawsalaCode
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: isDefaultAddress
 *         type: boolean
 *         required: true
 *
 *       - in: formData
 *         name: location
 *         type: object
 *         required: false
 *
 *       - in: formData
 *         name: cityName
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: countryName
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: areaName
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: zipCode
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
 *  get:
 *    tags:
 *        - My Addresses
 *    summary: "Get My Addresses List"
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
    .get(controller.findOne)
    .put(controller.update)
/**
 * @swagger
 *
 * /api/v1/addresses/{id}:
 *  put:
 *    tags:
 *        - My Addresses
 *    summary: "edit My Address"
 *    consumes:
 *      - application/x-www-form-urlencoded
 *    parameters:
 *       - in: path
 *         name: id
 *         type: string
 *         required: true
 *
 *       - in: formData
 *         name: houseOrFlatNumber
 *         type: string
 *         required: false
 *       - in: formData
 *         name: fullAddress
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: bawsalaCode
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: customType
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: landmark
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: type
 *         type: string
 *         required: false
 *         enum: [HOME, OFFICE, OTHER]
 *
 *       - in: formData
 *         name: isDefaultAddress
 *         type: boolean
 *         required: false
 *
 *       - in: formData
 *         name: location
 *         type: object
 *         required: false
 *
 *       - in: formData
 *         name: cityName
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: countryName
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: areaName
 *         type: string
 *         required: false
 *
 *       - in: formData
 *         name: zipCode
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
 *  get:
 *    tags:
 *        - My Addresses
 *    summary: "Get My Address"
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
 *        - My Addresses
 *    summary: "Delete My Address"
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
