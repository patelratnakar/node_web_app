// Requiring app 
const app = require('./app');

// Handling Uncaught Exception 
process.on('uncaughtException',(err)=>{
    console.log(`Error ${err}`)
    console.log('Shutting down the server due to Uncaught Exception')
    process.exit(1)
})

// Requiring dotenv and configuring
if(process.env.NODE_ENV !== 'production'){
const dotenv = require('dotenv');
dotenv.config({path:'./BackEnd/Config/config.env'})
}


// Defining Port from dotenv 
const port = process.env.PORT


// Requiring Database Connection 
require('./Database/connection')

// Requiring Cloudinary and configuring
const cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
})

// LISTENING 
const server = app.listen(port,()=>{
    console.log(`Listening at Port: ${port}`)
})

// Unhandled Promise Rejection 
process.on('unhandledRejection',err=>{
    console.log(`Error: ${err.message}`)
    console.log('Shutting down the server due to Unhandled promise rejection')
    server.close(()=>{
        process.exit(1)
    })
})