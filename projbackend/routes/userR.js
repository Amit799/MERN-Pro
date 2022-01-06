const express = require("express");
const router = express.Router();

const {getUserById, getUser, updateUser, userPurchaseList} = require("../controller/userC");
const { isSignedin, isAuthenticated , isAdmin} = require("../controller/authcont");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedin, isAuthenticated, getUser);
router.put("/user/:userId", isSignedin, isAuthenticated, updateUser);
router.get("/user/:userId", isSignedin, isAuthenticated,userPurchaseList );




module.exports = router;