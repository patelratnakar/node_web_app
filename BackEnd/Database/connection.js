// Requiring Mongoose 
const mongoose = require('mongoose');


// Connecting to database 
mongoose.connect(process.env.DataBase,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(()=>console.log('Connected To Database'))
