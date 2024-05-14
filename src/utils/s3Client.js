const aws = require('aws-sdk')
const multer = require('multer');
const multerS3 = require('multer-s3');
const constants = require('./constants');
const ffmpeg = require('fluent-ffmpeg');

const s3 = new aws.S3({
    secretAccessKey: constants.AWSSecretKey,
    accessKeyId: constants.AWSAccessKeyId,
    region: constants.Region
});

const storage = multerS3({
    s3: s3,
    bucket: constants.BucketName,
    acl: "public-read",
    key: function (req, file, cb) {
        const {userInfo: {_id}} = req;
        cb(null, _id + "/" + Date.now() + file['originalname']);
    },
    resize: {
        width: 600,
        height: 400,
    },
});

const upload = multer({
    storage: storage
});

module.exports = {
    uploadFile: upload.any()
};
