const productService= require('./product.services')

async function getProducts(req,res){
    res.send(await productService.getAllProducts());
}
async function getProductById(req,res){
    res.send(await productService.getProductById({_id:req.params.id}));
}
async function createProduct(req,res){
    res.send(await productService.createProduct(res.body));
}
async function deleteProduct(req,res){
    res.send(await productService.deleteProduct({_id:req.params.id}));
}

module.exports={getProducts, getProductById, createProduct, deleteProduct}