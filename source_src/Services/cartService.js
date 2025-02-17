const { getcartByUserId } = require("../Repositories/cartRepositories");
const { getProductById } = require("../Repositories/productRepositories");
const AppError = require("../utils/appError");
const { BadRequestError } = require("../utils/BadRequestError");
const NotFoundError = require("../utils/notFoundError");

async function getcart(userId){

    console.log("Cart service");

    const cart = await getcartByUserId(userId);

    if(!cart){
        throw new NotFoundError("cart");
    } else {
        return cart;
    }


}

async function modifyCart(userId, shouldAdd = true, productId){

    console.log("Cart service2");
    let cart = await getcart(userId);
    console.log("Cart service3");
    const product = await getProductById(productId);
    console.log("Cart service4");

    if(!product){
        throw new NotFoundError();
    }

    if(!product.inStock && product.quantity <= 0){
        throw new BadRequestError("Product is not available in stock");
    }

    console.log(cart);
    let foundProduct = false;
    cart.items.forEach(item => {
        if(item.product._id.toString() === productId){

            if(shouldAdd){
                if(product.quantity >= item.quantity + 1){
                    item.quantity += 1;
                    } else {
                    throw new AppError("The quantity of the item requested is not available ", 404);
                    }
            } else {
                if(item.quantity > 0){
                    item.quantity -= 1;
                    if(item.quantity == 0){
                        cart.items = cart.items.filter(item => item.product._id.toString() !== productId);
                        foundProduct = true;
                        return;
                    }
                } else {
                    throw new AppError("The product is not in your cart", 404);
                }
            }

            foundProduct = true;
        }
    });

    if(!foundProduct){
        if(shouldAdd){
            cart.items.push({
                product: productId,
                quantity: 1
            })
        } else {
            throw new AppError("Product in the cart", 404);
        }
        
    }

    await cart.save();

    cart = await getcart(userId);

    return cart;
}

async function clearWholeCart(userId){

    const cart = await getcart(userId);


    cart.items.splice(0, cart.items.length);

    await cart.save();

    return cart;
}

module.exports = {
    getcart,
    modifyCart,
    clearWholeCart
}