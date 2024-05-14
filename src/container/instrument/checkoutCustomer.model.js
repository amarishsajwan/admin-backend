const mongoose = require('mongoose');

//codes Schema
let orderSchema = mongoose.Schema({
   customerId:{},
    userId:{
        type:String,

    },

}, {timestamps: true});


module.exports = mongoose.model('checkoutCustomer', orderSchema);
