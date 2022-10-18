const ProductModel=require('./product.model');


async function getAllProducts(){
    return await ProductModel.find();
}
async function getProductById(id){
    return await ProductModel.find({_id:id});
}
async function createProduct(product){
    return await ProductModel.create(product);
}
async function deleteProduct(id){
    return await ProductModel.delete({_id:id});
}

module.exports={getAllProducts, getProductById, createProduct, deleteProduct}