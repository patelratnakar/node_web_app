// Requiring Product Collection from Database
const Product = require("../Database/productschema");

// Requiring ErrorHandlers Middlewares
const catchAsyncErrors = require("../Middlewares/catchasyncerrors");
const ErrorHandler = require("../utils/errorhandler");

const ApiFeatures = require("../utils/apifeatures");

const cloudinary = require("cloudinary");

// Add New Product --Admin
exports.addnewproduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.Images === "string") {
    images.push(req.body.Images);
  } else {
    images = req.body.Images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.Images = imagesLinks;
  req.body.User = req.user.id;

  const productalready = await Product.findOne({ Name: req.body.Name });

  if (productalready) {
    return next(new ErrorHandler("Product Already Exist", 400));
  }

  const product = await Product.create(req.body);

  res.status(200).json({
    success: true,
    product,
  });
});

// Get All Products
exports.getallproducts = catchAsyncErrors(async (req, res, next) => {
  // return await next(new ErrorHandler('this is temp error',404))

  const resultPerPage = 5;
  const productscount = await Product.countDocuments();

  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();

  let filteredProductsCount = await apifeatures.query.clone();
  filteredProductsCount = filteredProductsCount.length;

  apifeatures.pagination(resultPerPage);

  const products = await apifeatures.query;

  res.status(200).json({
    success: true,
    products,
    productscount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

// Get Product Details
exports.getproduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("No Product found", 400));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product --Admin
exports.updateproduct = catchAsyncErrors(async (req, res, next) => {

  const alreadyproduct = await Product.findById(req.params.id);
  
  if (!alreadyproduct) {
    return next(new ErrorHandler("No Product found", 400));
  }
  
  let images = [];
  
  if (typeof req.body.Images === "string") {
    images.push(req.body.Images);
  } else {
    images = req.body.Images;
  }
  
  const imagesLinks = [];
  
  // console.log(product.Images.length)
  for (let i = 0; i < alreadyproduct.Images.length; i++) {
    await cloudinary.v2.uploader.destroy(alreadyproduct.Images[i].public_id);
  }
  
  // console.log(images.length)
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }
  
  req.body.Images = imagesLinks;
  req.body.User = req.user.id;

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  // console.log(product)
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete Product --Admin
exports.deleteproduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("No Product found", 400));
  }

  await product.delete();

  res.status(200).json({
    success: true,
  });
});

// Create new review or update the review
exports.createproductreview = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body)
  const { Rating, Comment } = req.body;
  const Reviews = {
    User: req.user._id,
    Name: req.user.Name,
    Rating,
    Comment,
  };

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  const isreviewed = await product.Reviews.find(
    (element) => element.User.toString() === req.user._id.toString()
  );

  if (isreviewed) {
    product.Reviews.forEach((element) => {
      if (element.User.toString() === req.user._id.toString()) {
        (element.Rating = Rating), (element.Comment = Comment);
      }
    });
  } else {
    await product.Reviews.push(Reviews);
    product.NumofReviews = product.Reviews.length;
  }

  let avg = 0;
  product.Reviews.forEach((element) => {
    avg += element.Rating;
  });

  product.Ratings = avg / product.Reviews.length;

  await product.save();

  res.status(200).json({
    success: true,
    product,
  });
});

// Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.Reviews,
  });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.Reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let sum = 0;

  reviews.forEach((rev) => {
    sum += rev.Rating;
  });

  let avg= 0

  if (reviews.length === 0) {
    avg = 0;
  } else {
    avg = sum / reviews.length;
  }

  const Ratings = avg

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      Reviews:reviews,
      Ratings:Ratings,
      NumOfReviews:numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
