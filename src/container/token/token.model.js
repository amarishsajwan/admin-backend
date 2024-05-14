const mongoose = require('mongoose');

//codes Schema
let newSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    token: {
        type: String
    },
    platform: {
        type: String,
        enum: ['IOS', 'ANDROID'],
        default: "IOS"
    },
    deviceToken: {
        type: String
    },
    deviceId: {
        type: String
    },
    login_type: {
        type: String,
        default: 'USER'
    },
    app_version: {
        type: String,
        default: ""
    }
}, {timestamps: true});


module.exports = mongoose.model('token', newSchema);


