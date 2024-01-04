// Requiring Mongoose 
const mongoose = require('mongoose');

// Requiring validator 
const validator = require('validator');

const productschema = new mongoose.Schema({
    Name:{
        type:String,
        required:[true,'Please enter product name']
    },
    Description:{
        type:String,
        required:[true,'Plese enter product description']
    },
    Price:{
        type:Number,
        required:[true,'Plese enter product price']
    },
    Ratings:{
        type:Number,
        default:0
    },
    Images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }],
    Category:{
        type:String,
        required:[true,'Please enter product category']
    },
    Stock:{
        type:Number,
        required:[true,'Please enter product stock'],
        default:1
    },
    NumofReviews:{
        type:Number,
        default:0
    },
    Reviews:[{
        User:{
            type:mongoose.Schema.ObjectId,
            ref:"User",
            required:true
        },
        Name:{
            type:String,
            required:true
        },
        Rating:{
            type:Number,
            required:true
        },
        Comment:{
            type:String,
            required:true
        }
    }],
    CreatedAt:{
        type:Date,
        default:Date.now
    },
    User:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    }

})

const Product = mongoose.model('product', productschema)

module.exports = Product