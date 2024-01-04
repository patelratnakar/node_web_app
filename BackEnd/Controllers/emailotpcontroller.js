const OTP = require("../Database/emailotpschema");
const User = require("../Database/userschema");
const catchasyncerrors = require("../Middlewares/catchasyncerrors");
const ErrorHandler = require("../utils/errorhandler");
const sendEmail = require("../utils/SendEmail");

// Email OTP generate
exports.generateregisterotp = catchasyncerrors(async (req, res, next) => {
  const { Name, Email, Password, CPassword } = req.body;

  if (!Name || Name.length < 1) {
    return next(new ErrorHandler("Please Enter Valid Name", 400));
  }
  let re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!re.test(Email)) {
    return next(new ErrorHandler("Please Enter Valid Email Address", 400));
  }
  const useralready = await User.findOne({ Email });

  if (!useralready) {
    if (!Password) {
      return next(new ErrorHandler("Please Enter Password", 400));
    }
    if (!CPassword) {
      return next(new ErrorHandler("Please Enter Confirm Password", 400));
    }
    if (Password !== CPassword) {
      return next(new ErrorHandler("Password Doesn't Match", 400));
    }

    const registerotp = Math.floor(100000 + Math.random() * 900000);

    const registerotpexpire = new Date(Date.now() + 10 * 60 * 1000);

    const Already = await OTP.findOne({ Email });

    if (Already) {
      await Already.deleteOne();
    }

    await OTP.create({ Email, registerotp, registerotpexpire });

    const message = `Your Email Verification token is :- \n\n ${registerotp}`;
    try {
      await sendEmail({
        email: Email,
        subject: "Ecommerce Email Verification",
        message,
      });
      res.status(200).json({
        success: true,
        message: "Email Sent",
        registerotp,
      });
    } catch (error) {
      await OTP.deleteOne({ Email });
      return next(new ErrorHandler(error.message, 500));
    }
  } else {
    return next(new ErrorHandler("User Already exist", 400));
  }
});
