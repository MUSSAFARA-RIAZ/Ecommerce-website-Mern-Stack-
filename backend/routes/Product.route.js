const express = require("express")
const router = express.Router()
const { ProductController, createProduct, updateProduct, deleteProduct, getproductDetails } = require("../controller/Product.controller")
const { isauthenticatedUser, authorizedroles } = require("../middleware/auth")
// isuathenticated user here the concept is that only logged in can access all the products 
// if user is login we save token in cookie and get product details but if cookie is null then it shows pls login 

router.route("/products").get(ProductController)
router.route("/products/new").post(isauthenticatedUser, authorizedroles("admin"), createProduct)
router.route("/products/:id").put(isauthenticatedUser, authorizedroles("admin"), updateProduct).delete(isauthenticatedUser, authorizedroles("admin"), deleteProduct).get(getproductDetails)


module.exports = router
