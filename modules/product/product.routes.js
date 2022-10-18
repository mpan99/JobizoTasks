const express= require('express');
const productR=express.Router();
const productController= require('./product.controller')
const prefix= "/api/v1/product"

productR.get(prefix+'/',productController.getProducts);
productR.get(prefix+'/:id',productController.getProductById);
productR.post(prefix+'/',productController.createProduct);
productR.delete(prefix+'/:id',productController.deleteProduct);

module.exports=productR;