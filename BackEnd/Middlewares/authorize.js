// Requiring jwttoken generate and save 
const jwt = require('jsonwebtoken');

// Requiring ErrorHandler 
const ErrorHandler = require('../utils/errorhandler');

// Requiring User from database
const User = require('../Database/userschema');

// Requiring catchAsyncErrors
const catchAsyncErrors = require("./catchasyncerrors");

// authorize user middleware
exports.authuser = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.jwttoken
    if (!token) {
        return next(new ErrorHandler('Login First',401))
    }else{
        
        
        const decodeddata = await jwt.verify(token, process.env.JWT_Secret)
        const user = await User.findOne({ _id: decodeddata.id, 'Tokens.Token':token })
        // console.log(user)
        if (!user) {
            return next(new ErrorHandler('User Not Found',400))
        }
            req.token = token
            req.user = user
            next()
    }

})

// authorize roles middleware
exports.authroles = (roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.Role)){
            new ErrorHandler(`Role: ${req.user.Role} is not allowed to access this resouce `,403)
        }
        next()
        
    }
}