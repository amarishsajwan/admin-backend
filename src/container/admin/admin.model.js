const sequelize = require("sequelize");
const db = require("../../connections/sequelize");
var user = db.define(
    "admins",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: sequelize.UUID,
            defaultValue: sequelize.UUIDV4,
          },
        username: { type: sequelize.STRING },
        // email:{type: sequelize.STRING},
        password: { type: sequelize.STRING },
        // token: { type: sequelize.STRING },
        role: {
            type:sequelize.STRING,
            type: sequelize.ENUM('superAdmin','subAdmin'),
        }
    }
);
module.exports = user;
// const mongoose = require('mongoose');

// //codes Schema
// let userSchema = mongoose.Schema({
//     name: {
//         type: String,
//         default:null
//     },
//     email: {
//         type: String,
//         default:null
//     },
//     country_code: {
//         type: String,
//         required: true
//     },
//     contact_no: {
//         type: String,
//         required: true
//     },
//     profile_image: {
//         type: String,
//         default:null
//     },
//     gender: {
//         type: String,
//         default:null
//     },
//     dob: {
//         type: Date,
//         default: null
//     },
//     isDeleted: {
//         type: Boolean,
//         default: false
//     },
//     isActive: {
//         type: Boolean,
//         default: false
//     },
//     isRegister: {
//         type: Boolean,
//         default: false
//     },
//     isVerifiedEmail:{
//         type: Boolean,
//         default: false
//     },
//     mailToken:{
//         type: String
//     },
//     favouriteItems:[],
//     favouriteKitchens:[],
//     language: {
//         type: String,
//         default: 'en'
//     }

// }, {timestamps: true});


// module.exports = mongoose.model('customers', userSchema);
