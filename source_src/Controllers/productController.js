const {registerProduct, findProductById, findAndDeleteProductByID, allProducts} = require('../Services/productService')

const cloudinary = require('../config/cloudinaryConfig');
const fs = require('fs/promises');
const AppError = require('../utils/appError');


async function createProduct(req, res){

    // console.log(req.file);

    let response;

    try {

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log("Result from cloudinary", result)
            await fs.unlink(req.file.path);

            response = await registerProduct(req.body, result);
        } else {

            response = await registerProduct(req.body, "Image not attached");
        }

        return res.status(201).json({
            message: "Product added successfully",
            success: true,
            data: response,
            error: {}

        })

    } catch (error) {
        console.log(error.message);
        return res.json({message: error.message})
    }

}

async function getProduct(req, res){



    try {
        let response = await findProductById(req.params._id);
        return res.status(200).json({
            message: "Found the required product",
            success: true,
            data: response,
            error: {}
        })
    } catch (error) {

        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
       
    }


}

async function getProducts(req, res){


    try {
        let response = await allProducts(req.body);
        return res.status(200).json({
            message: "Found the all products",
            success: true,
            data: response,
            error: {}
        })
    } catch (error) {
        console.log(error.message);
        return res.json({message: error.message});
    }


}


async function deleteProduct(req, res){

    console.log("product controller");

    try {
        let response = await findAndDeleteProductByID(req.params._id)
        return res.status(201).json({
            message: "Product deleted successfully",
            success: true,
            data: response,
            error: {}

        })
    } catch (error) {
        console.log(error.message);
        return res.json({message: error.message});
    }
}

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    deleteProduct
}