const user = require("../models/user");
const Order = require("../models/order")




exports.getUserById = (req, res, next, id) =>{
    user.findById(id).exec((err, user)=> {
        if(err || !user){
            return res.status(400).json({
                error : "No user was found in DB"
            });
        }

        req.profile = user 
        next();
    });
};

exports.getUser = (req, res) =>{

    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    return res.json(req.profile);
};

exports.updateUser = (req,res) => {
    user.findByIdAndUpdate(
        {_id: req.profile._id },
        {$set: req.body },
        {new: true, useFindAndModify: false},
        (err,user)=> {
            if(err) {
                return res.status(400).json({
                    error: "You ar not authorized to update this user"
                });
            }
            user.salt = undefined;
            user,encry_password = undefined;
            res.json(user);
        }
    )
};

exports.userPurchaseList = (req, res) => {
    Order.find({user : req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err) {
            return res.status(400).json({
                error : "NO ORDER IN THIS ACCOUNT"
            });
        }
        return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req, res, next) => {
 let purchases = []
 req.body.order.products.foreach( product => {
     purchases.push({
         _id : product.id,
         name : product.name,
         description : product.description,
         category : product.category,
         quantity : product.quantity,
         amount : req.body.order.amount,
         trabsaction_id : req.body.order.trabsaction_id
     });
 });
      user.findOneAndUpdate(
          {_id : req.profile._id},
          {$push: {purchases : purchases}},
          {new : true},
          (err, purchase) => {
              if(err){
                  return res.status(400).json({
                      error : "unable to save purchase list"
                  })
              }
          }
      )

    next();
};