const express=require("express")
const router=express.Router()
const {ProductController, createProduct, updateProduct, deleteProduct,getproductDetails}=require("../controller/Product.controller")

router.route("/products").get(ProductController)
router.route("/products/new").post(createProduct)
router.route("/products/:id").put(updateProduct).delete(deleteProduct).get(getproductDetails)


module.exports=router
