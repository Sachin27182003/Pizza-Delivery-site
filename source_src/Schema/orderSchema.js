const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items:[
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice: {
         type: Number,
         required: true
    },
    status: {
        type: String,
        default:"ORDERED",
        enum: ["ORDERED", "CANCELLED", "DELIVERED", "PROCESSING", "OUT FOR DELIVERY"],
    },
    address:{
        type: String,
        minLength: [10, "Please enter a valid address"],
        trim: true
    },
    PaymentMethod:{
        type: String,
        enum: ["COD", "UPI", "INTERNET-BANKING", "CARD", "WALLET"],
        default: "COD"  
    }
},{timestamps: true})

const order = mongoose.model("Order", orderSchema); 

module.exports = order;