const express = require("express");
const router = express.Router();
const {check,validationResult} = require("express-validator");
const {signup,signout,signin,isSignedin} = require('../controller/authcont');


router.post('/signup',[
    check("name","name should be atleast 3 char").isLength({min : 3}),
    check("email","email is requiredd").isEmail(),
    check("password","password field is required").isLength({min : 5})
],signup);

router.post('/signin',[
    check("email","email is requiredd").isEmail(),
    check("password","password should be 5 char").isLength({min : 5})
],signin);

router.get('/signout',signout);


module.exports = router;