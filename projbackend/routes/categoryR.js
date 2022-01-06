const express = require("express");
const router = express.Router();

const { 
    getCategoryById, 
    createCategory,
    getCategory, 
    getAllCategory,
    updateCategory,
    removeCategory } = require("../controller/categoryC");

const {isSignedin, isAdmin,isAuthenticated} = require("../controller/authcont");
const {getUserById} = require("../controller/userC");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryById);


//actual routes goes here
router.post("/category/create/:userId",isSignedin, isAuthenticated, isAdmin, createCategory);


//read routes
router.get("/category/:categoryId",getCategory);
router.get("/categories",getAllCategory);

//update route
router.put("/category/:categoryId/:userId",isSignedin, isAuthenticated, isAdmin, updateCategory);

//delete route
router.delete("/category/:categoryId/:userId",isSignedin, isAuthenticated, isAdmin, removeCategory);



module.exports = router;