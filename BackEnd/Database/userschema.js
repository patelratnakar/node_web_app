// Requiring Mongoose 
const mongoose = require('mongoose');

// Requiring validator 
const validator = require('validator');

// Requiring bcryptjs 
const bcryptjs = require('bcryptjs');

// Requiring Jsonwebtoken 
const jwt = require('jsonwebtoken');

// Requiring Crypto 
const crypto = require('crypto');

// Defining User Schema
const userschema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Please Enter Your Name"]
    },
    Email: {
        type: String,
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    Password: {
        type: String,
        required: [true, "Please enter a Password"],
        minlength: [3,'Password cannot be shorter than 3 characters'],
        select: false
    },
    Avatar: {
        public_id: {
            type: String,
            // required: true
        },
        url: {
            type: String,
            // required: true
        }
    },
    Tokens: [{
        Token: String
    }],
    Role: {
        type: String,
        default: 'user',
    },
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    resetpasswordtoken:String,
    resetpasswordexpire:String,
    TimeElapsed:[{
        Product:{
            type:mongoose.Schema.ObjectId,
            ref:"Product"
        },
        Time:{
            type:Date
        }
    }]
})

// Brcypt Password 
userschema.pre('save', async function (next) {
    if (this.isModified('Password')) {
        this.Password = await bcryptjs.hash(this.Password, 12)
        next()
    }
})

// JWT Token 
userschema.methods.generatetoken = async function () {
    const Token = await jwt.sign({ id: this._id }, process.env.JWT_Secret, {
        expiresIn: process.env.JWT_Expire
    })
    this.Tokens = this.Tokens.concat({ Token })
    this.save()
    return Token
}
userschema.methods.timeelapsed = async function (update,req) {
    let already
    this.TimeElapsed.map((i)=>{
        if(i.Product == req.params.product){
            already = true
            i.Time = update.Time
        }
    })
    if(!already){
        this.TimeElapsed = this.TimeElapsed.concat(update)
    }
    this.save()
}

userschema.methods.generateresettoken = function () {

    // Generating 
    const resettoken = crypto.randomBytes(20).toString('hex')

    // Hashing and adding reseypasswordtoken to userschema
    this.resetpasswordtoken = crypto.createHash('sha256').update(resettoken).digest('hex')

    this.resetpasswordexpire = new Date( Date.now()+ 15*60*1000)

    this.save()

    return resettoken
}

const User = mongoose.model('user', userschema)

module.exports = User