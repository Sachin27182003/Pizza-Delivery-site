const { getcartByUserId } = require("../Repositories/cartRepositories");
const { createNewOrder, fetchOrders, fetchOrderById, updateOrderById } = require("../Repositories/orderRepositories");
const { findUser } = require("../Repositories/userRepositories");
const NotFoundError = require("../utils/notFoundError");
const { clearWholeCart } = require("./cartService");


async function createOrder(userId, paymentMethod, address) {
    const cart = await getcartByUserId(userId);
    const user = await findUser({ _id: cart.user });

    if (!cart) {
        const error = new Error("Cart not found");
        error.statusCode = 404;
        throw error;
    }

    if (cart.items.length === 0) {
        return false;
    }

    const orderObject = {
        user: cart.user,
        items: cart.items.map(cartitem => ({
            product: cartitem.product._id,
            quantity: cartitem.quantity
        })),
        status: "ORDERED",
        totalPrice: 0,
        address,
        PaymentMethod: paymentMethod,
    };

    cart.items.forEach((item) => {
        orderObject.totalPrice += item.product.price * item.quantity;
    });

    try {
        const order = await createNewOrder(orderObject);

        if (!order) {
            const error = new Error("Failed to create order.");
            error.statusCode = 500;
            throw error;
        }

        await clearWholeCart(userId);
        return order;

    } catch (error) {
        throw error; // propagate the actual error
    }
}



async function getOrders(userId){

    const orders = await fetchOrders({user: userId})

    if(!orders){
        throw new NotFoundError("Orders not found");
    }

    return orders;
}

async function getOrderById(orderId){

    const order = await fetchOrderById({_id: orderId})

    if(!order){
        throw new NotFoundError("Orders not found");
    }

    return order;
}

async function modifyOrder(orderId, updatedAddress, status){

    let updateThis;

    console.log(updatedAddress);
    console.log(status);
    
    if(updatedAddress){
        updateThis = {
            address: updatedAddress
        };
    } else {
        updateThis = {
            status: status
        };
    }

    console.log(updateThis);

    const order = await updateOrderById(orderId, updateThis);

    if(!order){
        throw new NotFoundError("Orders not found");
    }

    return order;
}

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    modifyOrder
}