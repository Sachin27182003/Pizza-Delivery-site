const order = require('../Schema/orderSchema');

async function createNewOrder(orderDetails) {
    try {
        const Order = await order.create(orderDetails);
        return Order;
    } catch (error) {

        // Handle Mongoose validation errors
        if (error.name === "ValidationError") {
            const invalidParams = Object.values(error.errors).map(err => err.message);
            const message = invalidParams.join('\n'); // <-- only the error messages            
            const validationError = new Error(message);
            validationError.statusCode = 400;
            throw validationError;
        }

        // For all other errors
        const serverError = new Error("Something went wrong while creating the order.");
        serverError.statusCode = 500;
        throw serverError;
    }
}


async function fetchOrders(userId){

    try {
        const orders = await order.find(userId).populate('items.product');
        return orders;
    } catch (error) {
        console.log(error.message);
    }
}

async function fetchOrderById(orderId){

    try {
        const data = await order.findById(orderId).populate('items.product');
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

async function updateOrderById(orderId, updateThis){

    try {
        const data = await order.findByIdAndUpdate(orderId, updateThis, {new: true}).populate('items.product');
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createNewOrder,
    fetchOrders,
    fetchOrderById,
    updateOrderById
}