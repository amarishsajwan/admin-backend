const express = require('express');
const router = express.Router();
const controller = require('./menu.controller');
const {addUserInfo} = require('../../middleware/authorize')

router.route('/')
    .get(addUserInfo, controller.find)

/**
 * @swagger
 *
 * /api/v1/menu:
 *  get:
 *    tags:
 *        - Menu
 *    summary: "menu list"
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
 *         name: kitchenId
 *         type: string
 *         required: false
 *
 *       - in: query
 *         name: categoryId
 *         type: string
 *         required: false
 *
 *       - in: query
 *         name: subCategoryId
 *         type: string
 *         required: false
 *
 *       - in: query
 *         name: isFavourite
 *         type: boolean
 *         required: false
 *
 *       - in: query
 *         name: isFeatured
 *         type: boolean
 *         required: false
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

router.route('/list')
    .get(controller.categoryList)

/**
 * @swagger
 *
 * /api/v1/category/list:
 *  get:
 *    tags:
 *        - Category
 *    summary: "Category list"
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


router.route('/:id').get(controller.findOne);
/**
 * @swagger
 *
 * /api/v1/menu/{id}:
 *  get:
 *    tags:
 *        - Menu
 *    summary: "Menu details"
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
