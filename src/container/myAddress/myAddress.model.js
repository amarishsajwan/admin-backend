const mongoose = require('mongoose');

const addressesSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    houseOrFlatNumber: {
        type: String,
    },
    landmark: {
        type: String
    },
    type: {
        type: String,
        required: true,
        enum: ['HOME', 'OFFICE', 'OTHER']
    },
    isDefaultAddress: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    customType: {
        type: String
    },
    fullAddress: {
        type: String
    },

    location : {
    },
    cityName:  {
        type: String
    },
    countryName:  {
        type: String
    },
    areaName: {
        type: String
    },
    zipCode:  {
        type: String
    },
    bawsalaCode:{
        type: String
    }

}, { timestamps: true });

module.exports = mongoose.model('addresses', addressesSchema);
