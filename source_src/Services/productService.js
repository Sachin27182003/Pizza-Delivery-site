const {addProduct, getProductById, deleteProductById, getAllProducts} = require('../Repositories/productRepositories')
const mongoose = require('mongoose');
const NotFoundError = require('../utils/notFoundError');
const { ObjectId } = mongoose.Types;



async function registerProduct(userDetails, imageDetails){

    

    const product = await addProduct({
        name: userDetails.name,
        description: userDetails.description,
        productImage: imageDetails.url || imageDetails,
        publicId: imageDetails.public_id,
        price: userDetails.price,
        category: userDetails.category,
        inStock: userDetails.inStock,
        quantity: userDetails.quantity

    })

    if(!product){
        throw {message: "Something went wrong while registering new product", statuscode: 500}
    }

    return product
}

async function findProductById(productID){


    if (!ObjectId.isValid(productID)) {  //checks whether given paramerter is valid ObjectId or not
        return res.status(400).send({ error: 'Invalid product ID' });
    }

    const response = await getProductById(productID);
    
   if(!response){
    throw new NotFoundError("Product");
   } 

   return response;
   
}

async function allProducts(count){


    const response = await getAllProducts(count);

   if(!response){
    throw new NotFoundError("Products");
   } 

   return response;
   
}

async function findAndDeleteProductByID(productID){

    console.log("product service");
    const product = await getProductById(productID);

    if(!product){
        throw new NotFoundError("product Not found");
    }

    const response = await deleteProductById(productID, product.publicId);
    
   if(!response){
    throw {message: "Product Not Found To Delete", statusCode: 500};
   } else {
    return response;
   }

}

module.exports = {
    registerProduct,
    findProductById,
    allProducts,
    findAndDeleteProductByID
}