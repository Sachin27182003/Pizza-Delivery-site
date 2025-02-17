const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Product name is required"],
        minLength: [5, "Please Enter a valid product name"],
        trim: true,

    },
    description:{
        type: String,
        required: [true, "Product description is required"],
        minLength: [5, "Please Enter a valid description"],
        trim: true,

    },
    productImage:{
        type: String,
    },
    publicId:{
        type: String
    },
    quantity:{
        type: Number,
        required: true,
        default: 10
    },
    price: {
        type: Number,
        required: [true, "Price can not be empty"],
        min: [0, "Price can not be negative"],
        trim: true,

    },
    category:{
        type: String,
        enum: ['veg', 'non-veg', 'soft-drink'],
        default: 'veg'
    },
    inStock:{
        type: Boolean,
        required: [true, "inStock status is require"],
    }

},{timestamps: true}, {versionKey: false})

const product = mongoose.model("Product", productSchema);

module.exports = {
    product
}