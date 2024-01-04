// Jwttoken generate and save 
const sendtoken = async (user,statuscode,res)=>{
    const Token= await user.generatetoken()

    const options = {
        expires:new Date(
            Date.now()+ 15*24*60*60*1000
        ),
        httpOnly:true,
    }
    res.status(statuscode).cookie('jwttoken',Token,options).json({
        success:true,
        Token,
        user
    })
}
module.exports = sendtoken