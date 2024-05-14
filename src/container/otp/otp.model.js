const mongoose = require('mongoose');

const otpVerifySchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    otp: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['register', 'passwordReset', 'changeContact', 'login']
    },
    platform:{
        type: String,
        required: true,
        enum: ['IOS', 'ANDROID']
    },
    app_version: {
        type: String,
        default: ""
    },
    country_code: {
        type: String,
        required: true,
    },
    contact_no: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
}, {timestamps: true});


module.exports = mongoose.model('otp_verify', otpVerifySchema);
