const mongoose = require('mongoose');

//codes Schema
let cartSchema = mongoose.Schema({
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'items',
        required: true
    },
    kitchenId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'kitchens',
        required: true

    },
    itemName: {
        type: String,
        default: ""
    },
    itemImage: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    packageType: {
        type: String
    },
    price: {type: Number, default: null},
    isDeleted: {
        type: Boolean,
        default: false
    },
    quantity: {
        type: Number,
        default: 1
    },
    orderBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customers'
    },
    addOnItemIds: []

}, {timestamps: true});


module.exports = mongoose.model('cart', cartSchema);
