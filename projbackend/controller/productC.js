const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");



exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("category")
    .exec((err, product) => {
        if (err){
            return res.status(400).json({
                error : "Product not found"
            })
        }
        req.product = product;
        next();
    })
};

exports.createProduct = (req, res)=> {
  let form = new formidable.IncomingForm();
  form.keepextension = true;
  form.parse(req, (err,fields,file)=>{
      if(err){
          return res.status(400).json({
              error : "problem with image"
          });
      }

      //destructure the fields
        const {name, description,category, stock, price} = fields;

        if(!name || !description || !price || !category || !stock
            ){
                return res.status(400).json({
                    Error : "please include all fields"
                })
            }

       let product = new Product(fields);

       if(file.photo){
           if(file.photo.size > 3000000){
               return res.status(400).json({
                   Error : "file size too big"
               })
           }
           product.photo.data = fs.readFileSync(file.photo.path)
           product.photo.contentType = file.photo.type
       }
       //save to the db
       product.save((err, product)=> {
           if(err){
               res.status(400).json({
                   Error : "saving tshirt in db failed"
               })
           }
           res.json(product)
       })
  });
};

exports.getProduct = (req, res) =>  {

    req.product.photo = undefined
    return res.json(req.product)
}
//middleware 
exports.photo = (req, res, next) => {
    if(req.product.photo.data){
        res.set("content-type", req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next();
};

//delete
exports.deleteProduct = (req, res)=> {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err){
            return res.status(400).json({
                Error : "failed to delete the product"
            });
        }
        res.json({
            message : "Deletion was successfull",
            deletedProduct
        });
    });
};

//update
exports.updateProduct = (req, res)=> {
    let form = new formidable.IncomingForm();
    form.keepextension = true;
    form.parse(req, (err,fields,file)=>{
        if(err){
            return res.status(400).json({
                error : "problem with image"
            });
        }
  
         let product = req.product;
         product = _.extend
  
         if(file.photo){
             if(file.photo.size > 3000000){
                 return res.status(400).json({
                     Error : "file size too big"
                 })
             }
             product.photo.data = fs.readFileSync(file.photo.path)
             product.photo.contentType = file.photo.type
         }
         //save to the db
         product.save((err, product)=> {
             if(err){
                 res.status(400).json({
                     Error : "saving tshirt in db failed"
                 })
             }
             res.json(product)
         })
    });

};

//product listing
exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sort = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBY, "asc"]])
    .limit(limit)
    .exec((err,product) => {
        if(err){
            return res.status(400).json({
                Error : "no product found"
            })
        }
        res.json(products)
    })
};


exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if(err){
            return res.status(400).json({
                error : "no category found"
            })
        }
        res.json(category)
    })
}

exports.updateStock = (req, res, next) => {

    let myOpertions = req.body.order.products.map(prod => {
        return
       ({
            updateOne : {
                filter : {_id: prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        })
    })

    Product.bulkWrite(myOpertions, {}, (err,products) => {
        if(err){
            return res.status(400).json({
                error : "bulk operation failed"
            });
        }
        next();
    });
};