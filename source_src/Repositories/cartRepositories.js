const Cart = require('../Schema/cartSchema');
const { BadRequestError } = require('../utils/BadRequestError');
const { InternalServerError } = require('../utils/internalServerError');

async function createCart(userId){
 
    try {
        console.log(userId);
        const newCart = await Cart.create({
            user: userId
        });
        return newCart;
    } catch (error) {
        if(error.name === 'validation error'){
            const errorMessageList = Object.keys(error.errors).map((property)=> {
                return error.errors[property].message;
            })
            throw new BadRequestError(errorMessageList);
        } else {
            console.log(error);
            throw new InternalServerError();
        }
    }
}


async function getcartByUserId(userId){

    try {
        const cart = await Cart.findOne({
            user: userId
        }).populate('items.product');

        if (cart) {
            await cart.populate('items.product');
        }
        return cart;
    } catch (error) {
        console.log(error.errors);
        throw new InternalServerError();
    }
}


module.exports = {
    createCart,
    getcartByUserId
}