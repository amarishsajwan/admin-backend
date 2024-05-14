const mongoose = require('mongoose');

//codes Schema
let orderSchema = mongoose.Schema({
    transactionId: {
        type:String,

    },
    actionId:{
        type:String,

    },
    amount:{
        type:String,

    },
    currency:{
        type:String,

    },
    userId:{
        type:String,

    },
    orderId:{
        type:String,

    },
    srcId:{
        type:String,
    }

}, {timestamps: true});


module.exports = mongoose.model('payment', orderSchema);
