const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a product description"],
  },
  price: {
    type: Number,
    required: [true, "Please provide a product price"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  Images: [
    {
      publicid: {
        type: String,
        required: [true, "Please provide a product image publicid"],
      },
      url: {
        type: String,
        required: [true, "Please provide a product image url"],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please provide a product category"],
    // enum:{
    //     values:[
    //         "Electronics",
    //         "Cameras",
    //         "Laptops",
    //         "Accessories",
    //         "Headphones",
    //         "Food",
    //         "Books",
    //         "Clothes/Shoes",
    //         "Beauty/Health",
    //         "Sports",
    //         "Outdoor",
    //         "Home"
    //     ],
    //     message:"Please select correct category for product"
    // }
  },
  stock: {
    type: Number,
    required: [true, "Please provide a product stock"],
    maxLength: [4],
    default: 1,
  },
  numberOfViews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating:{
        type:Number,
        required:true
      },
     Comment:{
        type:String,
        required:true
        
      }
    },
  ],
  //  }
}, {timeStamps: true});
module.exports = mongoose.model("Product", ProductSchema);


