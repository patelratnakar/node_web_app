const catchAsyncErrors =require('../Middlewares/catchasyncerrors')

exports.addtocart = catchAsyncErrors(async (req, res, next) => {

    
    const { Name, Email, Password } = req.body
    
    const useralready = await User.findOne({ Email })
    
    
    if (!useralready) {
        const mycloud = await cloudinary.v2.uploader.upload(req.body.Avatar,{
            folder:'avatars',
            width:150,
            crop:'scale',
            public_id: `${Date.now()}`,
            resource_type: "auto"
        })
        const user = await User.create({
            Name, Email, Password,
            Avatar: {
                public_id: mycloud.public_id,
                url: mycloud.secure_url
            }
        })
        if (!user) {
            return next(new ErrorHandler('Invalid Credentials', 400))
        } else {
            sendtoken(user, 201, res)
        }
    } else {
        return next(new ErrorHandler('User Already exist', 400))
    }

})
