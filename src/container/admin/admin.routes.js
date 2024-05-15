const express = require('express');
const router = express.Router();
const s3Client = require('../../utils/s3Client');
const controller = require('./admin.controller');

router.route('/createAdmin').post(controller.createAccount);

module.exports = router;
