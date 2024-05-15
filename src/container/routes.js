const express = require('express');
const router = express.Router();

const sessionRouter = require('./session/session.routes');
const adminRouter = require('./admin/admin.routes');

router.use('/admin', adminRouter);
router.use('/session', sessionRouter);

router.post('/test', function (req, res) {
    console.log("router.use('/session', sessionRouter);",req.body)

})
router.post('/fail', function (req, res) {
    console.log("fail",req.body)
})

module.exports = router;