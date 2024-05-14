const mongoose = require('mongoose');

//codes Schema
let orderSchema = mongoose.Schema({
    kitchenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kitchens'

    },
    items: [],
    isDeleted: {
        type: Boolean,
        default: false
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    address: {},
    status: {
        type: String,
        default: "PENDING"
    },
    rejectReason: {
        type: String
    },
    fullAddress: {
        type: String
    },
    specialInstructions: {
        type: String
    },
    customerRating: {
        type: Number
    },
    customerComment: {
        type: String
    },
    orderId: {
        type: String,
        required: true
    },
    cartIds: [],
    totalPrice: {
        type: Number,
        required: true
    },
    isDriverAssigned:{
        type: Boolean,
        required: false
    },
    driverDetails:{

    },
    driverStatus: {
        type: Number,
        default: 0
    },
    kitchenAddress:{

    },
    dispatchedAt: {
        type: Number
    },
    deliveredAt: {
        type: Number
    },
    driverAssignedAt: {
        type: Number
    },
    driverNotFoundAt: {
        type: Number
    },
    preparingAt: {
        type: Number
    },
    readyAt: {
        type: Number
    },
    rejectedAt: {
        type: Number
    },
    deliveryStatus:{
        type: Number,
        default: 0
        // 0 for newOrder, 1 for progress, 3 for pickupFailed, 4 for delivery failed
    },
    deliveryTime: {
        type: Number
    },
    isPreOrder:{
        type: Boolean,
        default: false
    },
    preOrderTime:{
        type: Number,
        default: false
    },
    driverRequest: {
        type: Number,
        default: 0
    },
    paymentMode:{

    },
    deliveryCharges:{

    },
    vatTax:{

    }

}, {timestamps: true});


module.exports = mongoose.model('order', orderSchema);
