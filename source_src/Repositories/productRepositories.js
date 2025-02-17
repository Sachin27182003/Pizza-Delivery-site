const { product } = require('../Schema/productSchema')
const cloudinary = require('cloudinary').v2;

async function addProduct(productDetails){

    try {
        const response = product.create(productDetails);
        return response;
    } catch (error) {
        console.log(error.message);
    }

}

async function getProductById(productId){
    try {
        const Product = await product.findById(productId);
        return Product;
    } catch (error) {
        console.log(error);
    }
}

async function deleteProductById(productId, publicId){

await cloudinary.api
  .delete_resources([publicId], { type: 'upload', resource_type: 'image' })
  .then(result => console.log(result))
  .catch(err => console.error(err));


    try {
        const response = await product.findByIdAndDelete(productId)
        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addProduct,
    getProductById,
    deleteProductById
}