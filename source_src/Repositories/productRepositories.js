const { product } = require('../Schema/productSchema');
const NotFoundError = require('../utils/notFoundError');
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

async function getAllProducts(count) {

    try {
        const products = await product.find({}).skip(count.toSkip).limit(count.limit);

        if (!products.length) {
            throw new NotFoundError("No products found");
        }

        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw new NotFoundError("Products not found");
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
    getAllProducts,
    getProductById,
    deleteProductById
}