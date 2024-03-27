const errorHandler = require("../middleware/error");
const product = require("../models/Product.models");
const ErrorHandler = require("../utils/ErrorHandler");
const catchasyncHandlerfunc = require("../middleware/CatchasyncHandler");
const ApiFeature=require("../utils/APIfeature")



// create product

exports.createProduct = catchasyncHandlerfunc(async (req, res, next) => {
  const products = await product.create(req.body);
  res.status(201).json({
    success: true,
    products,
  });
});
// get all  products
exports.ProductController = catchasyncHandlerfunc(async (req, res) => {
  const products = await product.find();
  res.status(200).json({
    success: true,
    products,
  });
});
// get particular product details

exports.getproductDetails = catchasyncHandlerfunc(async (req, res, next) => {
  const searchmain=new ApiFeature(product.find(),req.query).search();
  const mainproduct=await searchmain.query;
  console.log(mainproduct)



  // const mainproduct = await product.findById(req.params.id);

  if (!mainproduct) {
    return next(new ErrorHandler("Product not found", 404));
  } else {
    res.status(200).json({
      success: true,
      message: "Product found",
      mainproduct,
    });
  }
});

// update product//
exports.updateProduct = catchasyncHandlerfunc(async (req, res, next) => {
  let productmain = await product.findById(req.params.id);
  if (!productmain) {
    return next(new ErrorHandler("Product not foundsssss", 404));
    // return res.status(404).json({
    //     success:false,
    //     message:"Product not found"
    // })
  }
  productmain = await product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchasyncHandlerfunc(async (req, res, next) => {
  const productmain = await product.findById(req.params.id);
  if (!productmain) {
    return next(new ErrorHandler("Product not found", 404));
    // res.status(500).json({
    //     success:false,
    //     message:"Product not found"
    // })
  }
  await productmain.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
