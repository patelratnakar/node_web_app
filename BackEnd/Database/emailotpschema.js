// Requiring Mongoose 
const mongoose = require('mongoose');

// Requiring validator 
const validator = require('validator');

const emailotpschema = new mongoose.Schema({
    Email: {
        type: String,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    registerotp:Number,
    registerotpexpire:Date
})

const OTP = mongoose.model('otp', emailotpschema)

module.exports = OTP