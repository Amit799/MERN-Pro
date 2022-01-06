const express = require("express");
const router = express.Router();

const {isSignedin, isAdmin,isAuthenticated} = require("../controller/authcont");
const {getUserById, pushOrderInPurchaseList} = require("../controller/userC");
const {updateStock} = require("../controller/productC")

const { getOrderById,
     createOrder,
      getAllOrders,
      getOrderStatus,
      updateStatus } = require("../controller/orderC");


//params
router.param("userId", getUserById);
router.param("userId", getOrderById);


//Actual routes

//create routes
router.post("/order/create/:userId", 
isSignedin,
 isAuthenticated, 
 pushOrderInPurchaseList,
 updateStock,
 createOrder);

 //read 
 router.get("/order/all/:userId", isSignedin, isAuthenticated,isAdmin, getAllOrders);

 //STATUS of order
 router.get("/order/status/:userId", isSignedin, isAuthenticated, isAdmin, getOrderStatus);
router.put("/order/:orderId/:userId", isSignedin, isAuthenticated, isAdmin, updateStatus );
module.exports = router;
