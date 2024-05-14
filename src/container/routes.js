const express = require('express');
const router = express.Router();

const sessionRouter = require('./session/session.routes');
const adminRouter = require('./admin/admin.routes');
const userRouter = require('./user/user.routes');
const kitchenRouter = require('./kitchen/kitchen.routes');
const menuRouter = require('./items/menu.routes');
const cartRouter = require('./cart/cart.routes');
const orderRouter = require('./order/order.routes');
const addressRouter = require('./myAddress/myAddress.routes');
const notificationRouter = require('./notification/notification.routes');
const favouriteRouter = require('./favourite/favourite.routes');
const reviewAndRating = require('./reviewAndRating/reviewAndRating.routes');
const payment = require('./payment/payment.routes');
const instruments = require('./instrument/instruments.routes');
const {jwtTokenVerify} = require('../middleware/authorize');

router.use('/admin', adminRouter);
router.use('/session', sessionRouter);
router.use('/customer', userRouter);
router.use('/kitchen', kitchenRouter);
router.use('/menu', menuRouter);
router.use('/category', menuRouter);
router.use('/cart',jwtTokenVerify, cartRouter);
router.use('/favourite',jwtTokenVerify, favouriteRouter);
router.use('/addresses', jwtTokenVerify, addressRouter);
router.use('/order',jwtTokenVerify, orderRouter);
router.use('/notification', jwtTokenVerify, notificationRouter);
router.use('/review-rating', jwtTokenVerify, reviewAndRating);
router.use('/payment', jwtTokenVerify, payment);
router.use('/instruments',jwtTokenVerify, instruments);

router.post('/test', function (req, res) {
    console.log("router.use('/session', sessionRouter);",req.body)

})
router.post('/fail', function (req, res) {
    console.log("fail",req.body)
})

module.exports = router;