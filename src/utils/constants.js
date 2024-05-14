require('dotenv').config();
require('./checkoutClient')
module.exports = {
    SERVER_URL: process.env.SERVER_URL || 'http://hk_customer.bawsala.net/api/v1',
    BASE_MONGO_URL: process.env.BASE_MONGO_URL,
    BASE_DATABASE: process.env.BASE_DATABASE,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    SALT: 10,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_PORT: process.env.MAIL_PORT,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
    MAIL_FROM_NAME: process.env.MAIL_FROM_NAME,
    MAIL_FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
    AWSSecretKey: process.env.AWSSecretKey,
    AWSAccessKeyId: process.env.AWSAccessKeyId,
    Region: process.env.Region,
    BucketName: process.env.BucketName,
    VFIRST_USERNAME: process.env.VFIRST_USERNAME,
    VFIRST_PASSWORD: process.env.VFIRST_PASSWORD,
    SOCKET_URL: process.env.SOCKET_URL,
    ACCESS_TOKEN_SECRET_KEY:process.env.ACCESS_TOKEN_SECRET_KEY

}
