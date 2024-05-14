const express = require('express');
const router = express.Router();
const controller = require('./favourite.controller');

router.route('/kitchen')
    .post(controller.addToFavouriteKitchen)
    .get(controller.favouriteKitchenList);
/**
 * @swagger
 *
 * /api/v1/favourite/kitchen:
 *  post:
 *    tags:
 *        - Favourite
 *    summary: "add kitchen  to favourite list"
 *    parameters:
 *       - in: formData
 *         name: kitchenId
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
 *  get:
 *    tags:
 *        - Favourite
 *    summary: "Get My Favourite kitchen List"
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

router.route('/menu')
    .post(controller.addToFavouriteMenu)
    .get(controller.favouriteMenuList);
/**
 * @swagger
 *
 * /api/v1/favourite/menu:
 *  post:
 *    tags:
 *        - Favourite
 *    summary: "add menu to favourite list"
 *    parameters:
 *       - in: formData
 *         name: menuId
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
 *  get:
 *    tags:
 *        - Favourite
 *    summary: "Get My Favourite Menu List"
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
 * /api/v1/favourite/{id}:
 *  delete:
 *    tags:
 *        - Favourite
 *    summary: "remove from favourite"
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
