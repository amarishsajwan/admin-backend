const mongoose = require('mongoose');

const addressesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    kitchenId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    customType: {
        type: String
    }

}, {timestamps: true});

module.exports = mongoose.model('favourite', addressesSchema);
