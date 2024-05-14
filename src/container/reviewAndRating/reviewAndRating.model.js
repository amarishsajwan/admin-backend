const mongoose = require('mongoose');

//codes Schema
let orderSchema = mongoose.Schema({
    kitchenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kitchens'

    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orders'
    },
    rating: {type: Number},
    comment: {type: String},
    isDeleted: {type: Boolean, default: false},

}, {timestamps: true});


module.exports = mongoose.model('reviewAndRating', orderSchema);
