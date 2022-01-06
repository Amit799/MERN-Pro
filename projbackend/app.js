require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser =require('body-parser');
const cookieParser = require ("cookie-parser");
const cors = require("cors");

//MY ROUTES

const authRoutes = require('./routes/auth');
const userRoutes = require("./routes/userR");
const categoryRoutes = require("./routes/categoryR");
const productRoutes = require("./routes/productR");
const orderRoutes = require("./routes/orderR");




//Database
mongoose.connect(process.env.DATABASES,{
    useNewUrlParser : true,
    useUnifiedTopology:true,
    UseCreateIndex:true
})
.then(()=>{
    console.log("database Connected");
});

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', orderRoutes);


//Port
const port = process.env.PORT || 7000;

//starting a server
app.listen(port,()=>{
    console.log(`app is running ${port}`)
});