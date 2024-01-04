// Requiring User collection form Database
const User = require("../Database/userschema");

// Requiring bcryptjs
const bcryptjs = require("bcryptjs");

// Requiring ErrorHandlers Middlewares
const catchAsyncErrors = require("../Middlewares/catchasyncerrors");
const ErrorHandler = require("../utils/errorhandler");

// Requiring sendEmail
const sendEmail = require("../utils/SendEmail.js");

// Requiring jwttoken generate and save
const sendtoken = require("../utils/SendJwtToken");

// Requiring Crypto
const crypto = require("crypto");

// Requiring Cloudinary
const cloudinary = require("cloudinary");
const OTP = require("../Database/emailotpschema");

// Home Page
exports.homecontroller = (req, res, next) => {
  res.status(200).json({
    message: "home",
  });
};

// User Registeration
exports.registeruser = catchAsyncErrors(async (req, res, next) => {
  const { Name, Email, Password, CPassword, Code, Avatar } = req.body;

  const useralready = await User.findOne({ Email });

  if (!useralready) {
    const otpverify = await OTP.findOne({
      Email,
      registerotp: Code,
      registerotpexpire: { $gt: Date.now() },
    });
    if (!otpverify) {
      return next(new ErrorHandler("Code is Invalid or has been Expired", 404));
    }

    if (!Password || !CPassword || Password !== CPassword) {
      return next(new ErrorHandler("Passwords dont Match", 400));
    }

    const userdata = {
      Name,
      Email,
      Password
    };
    if(Avatar.startsWith('data:image') && Avatar.length > 1000){
        const mycloud = await cloudinary.v2.uploader.upload(Avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
          public_id: `${Date.now()}`,
          resource_type: "auto",
        });
        userdata.Avatar = {
          public_id: mycloud.public_id,
          url: mycloud.secure_url,
        }

    }

    const user = await User.create(userdata);

    await otpverify.deleteOne();

    if (!user) {
      return next(new ErrorHandler("Invalid Credentials", 400));
    } else {
      sendtoken(user, 201, res);
    }
  } else {
    return next(new ErrorHandler("User Already exist", 400));
  }
});

// User Login
exports.loginuser = catchAsyncErrors(async (req, res, next) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return next(new ErrorHandler("Please Enter Email And Password", 401));
  }

  const user = await User.findOne({ Email }).select("+Password");

  // console.log(user)
  if (!user) {
    return next(new ErrorHandler("No user found", 400));
  } else {
    const isMatch = await bcryptjs.compare(Password, user.Password);
    if (isMatch) {
      sendtoken(user, 200, res);
    } else {
      return next(new ErrorHandler("Invalid Credentials", 401));
    }
  }
});

// User Logout
exports.logoutuser = catchAsyncErrors(async (req, res, next) => {
  req.user.Tokens = req.user.Tokens.filter(
    (i) => i.Token !== req.cookies.jwttoken
  );
  await req.user.save();

  res.clearCookie("jwttoken").json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotpass = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ Email: req.body.Email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  // Generate token
  const resettoken = await user.generateresettoken();

  const resetpasswordurl = `${req.protocol}://${req.get(
    "host"
  )}/reset/${resettoken}`;

  const message = `Your password reset token is :- \n\n ${resetpasswordurl} \n\nIf you havent requested`;

  try {
    await sendEmail({
      email: user.Email,
      subject: "Ecommerce Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Email Sent",
      resettoken,
    });
  } catch (error) {
    user.resetpasswordtoken = undefined;
    user.resetpasswordexpire = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password
exports.resetpass = async (req, res, next) => {
  const resetpasswordtoken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetpasswordtoken,
    resetpasswordexpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Token is Invalid or has been Expired ", 404));
  }

  if (req.body.Password !== req.body.CPassword) {
    return next(new ErrorHandler("Passwords dont Match", 400));
  }

  user.Password = req.body.Password;
  user.resetpasswordtoken = undefined;
  user.resetpasswordexpire = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
};

// Admin Page
exports.admin = (req, res, next) => {
  res.status(200).json({
    message: "Admin",
  });
};

// Me Page
exports.getuserdetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id });

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Password
exports.updatepassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ _id: req.user.id }).select("+Password");

  const { Password, newPass, newCPass } = req.body;

  const isPassMatch = await bcryptjs.compare(Password, user.Password);

  if (!isPassMatch) {
    return next(new ErrorHandler("Invalid Current Password", 400));
  }

  if (newPass !== newCPass) {
    return next(new ErrorHandler("Passwords dont Match", 400));
  }

  user.Password = newPass;
  await user.save();

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Profile
exports.updateprofile = catchAsyncErrors(async (req, res, next) => {
  const update = {
    Name: req.body.Name,
    Email: req.body.Email,
  };

  if (req.body.Avatar !== "") {
    const useralready = await User.findById(req.user.id);
    await cloudinary.v2.uploader.destroy(useralready.Avatar.public_id);

    const mycloud = await cloudinary.v2.uploader.upload(req.body.Avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
      public_id: `${Date.now()}`,
      resource_type: "auto",
    });
    update.Avatar = {
      public_id: mycloud.public_id,
      url: mycloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, update, { new: true });

  res.status(200).json({
    success: true,
    user,
  });
});

// Get All Users --Admin
exports.getallusers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User --Admin
exports.getsingleuser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("No user found", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update Roles --Admin
exports.updateuserprofile = catchAsyncErrors(async (req, res, next) => {
  const update = {
    Name: req.body.Name,
    Email: req.body.Email,
    Role: req.body.Role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, update, {
    new: true,
  });

  if (!user) {
    return next(new ErrorHandler("No user found", 400));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete Profile --Admin
exports.deleteuserprofile = catchAsyncErrors(async (req, res, next) => {
  const userdeleted = await User.findByIdAndDelete(req.params.id);
  // console.log(userdeleted)
  if (!userdeleted) {
    return next(new ErrorHandler("No user found", 400));
  }

  res.status(200).json({
    success: true,
    userdeleted,
    message: "User Deleted!",
  });
});

exports.timeelapsed = catchAsyncErrors(async(req,res,next)=>{
  const update = {
    Product:req.params.product,
    Time:req.body.date
  }
  const user = await User.findById(req.user.id)
  if(!user){
    return next(new ErrorHandler('No User Found',400))
  }
  const x = await user.timeelapsed(update,req)

  res.status(200).json({
    success:true
  })
})