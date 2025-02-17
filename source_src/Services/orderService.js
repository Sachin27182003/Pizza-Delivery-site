const { getcartByUserId } = require("../Repositories/cartRepositories");
const { createNewOrder, fetchOrders, fetchOrderById, updateOrderById } = require("../Repositories/orderRepositories");
const { findUser } = require("../Repositories/userRepositories");
const { BadRequestError } = require("../utils/BadRequestError");
const { InternalServerError } = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");
const { clearWholeCart } = require("./cartService");


async function createOrder(userId, paymentMethod){

    const cart = await getcartByUserId(userId);
    const user = await findUser({_id: cart.user})

    if(!cart){
        throw new NotFoundError("Cart not found");
    }

    if(cart.items.length === 0){
       return false;
    }

    const orderObject = {}

    orderObject.user = cart.user;
    orderObject.items = cart.items.map(cartitem => {
        return {product: cartitem.product._id, quantity: cartitem.quantity}
    })
    
    orderObject.status = "ORDERED";
    orderObject.totalPrice = 0;

    cart.items.forEach((items)=> {
        orderObject.totalPrice += items.product.price * items.quantity;
    })

    orderObject.address = user.address;

    orderObject.PaymentMethod = paymentMethod;

    const order = await createNewOrder(orderObject);

    if(!order){
        throw new InternalServerError();
    }

    await clearWholeCart(userId);

    return order;
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

async function modifyOrder(orderId, currentStatus){

    const order = await updateOrderById(orderId, {status: currentStatus});

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