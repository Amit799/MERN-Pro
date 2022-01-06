const express = require("express");
const router = express.Router();

const{getProductById, 
    createProduct, 
    getProduct, 
    photo, 
    updateProduct, 
    getAllProducts,
    getAllUniqueCategories,
    deleteProduct} = require("../controller/productC");

const{isSignedin,isAuthenticated,isAdmin} = require("../controller/authcont");
const{getUserById} = require("../controller/userC");



//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes

//create route
router.post("/product/create/:userId",
isSignedin,
isAuthenticated,
isAdmin,
createProduct);

//read route
 router.get("/product/:productId",getProduct);
 router.get("/product/photo/:productId", photo)

//delete route
router.delete("/product/:productId/:userId", isSignedin, isAuthenticated, isAdmin, deleteProduct);

//update route
router.put("/product/:productId/:userId", isSignedin, isAuthenticated, isAdmin, updateProduct);


//listing route

router.get("/products", getAllProducts)
router.get("/products/categories", getAllUniqueCategories)

module.exports = router;