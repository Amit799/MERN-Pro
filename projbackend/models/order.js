const mongoose = require("mongoose");
const {ObjectId} = require ("mongoose");
const ProductCartSchema = new mongoose.Schema({
    product : {
        type : ObjectId,
        ref : "Product"
    },
    name : String,
    count : Number,
    price : Number,
});

const ProductCart = mongoose.model("ProductCart",ProductCartSchema);

const OrderSchema =new mongoose.Schema({
    products : [ProductCartSchema],
    transaction_id : {},
    amount : {type : Number},
    address : String,
    status : {
        type : String,
        default : "Received",
        enum : ["Cancelled","Delivered","shipped","Processing","Received"]
    },
    updated : Date,
    user : {
        type : ObjectId,
        ref : "user"
    }
},{timestamps : true} );

const Order = mongoose.model("order",OrderSchema);

module.exports = {Order,ProductCart}