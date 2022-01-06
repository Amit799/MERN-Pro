const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 =require('uuid/v1');

const userSchema = new mongoose.Schema({
name : {
    type:String,
    required : true,
    maxlenght : 32,
    trim : true
},
last_name : {
    type : String,
    maxlenght : 32,
    trim : true
},
email : {
    type : String,
    maxlenght : 32,
    trim : true,
    unique : true
},
userinfo : {
    type : String,
    trim : true
},

encry_password : {
    type : String,
    required: true
},
salt : String,
role : {
    type : Number,
    default : 0
},
purchases : {
    type : Array,
    default : []
}
}
,{timestamps: true});

userSchema.virtual("password")
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.securepassword(password);
})
.get(function(){
    return this._password
})


userSchema.methods = {
    Autheticate : function(plainpassword){
        return this.securepassword(plainpassword) ===this.encry_password
    },

    securepassword : function (plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac('sha256',this.salt)
            .update(plainpassword)
            .digest('hex');
        }catch(err){
            return "";
        }
    }
};

module.exports = mongoose.model("user",userSchema)