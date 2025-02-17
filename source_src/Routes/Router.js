const express = require('express');
const { getCartById,  modifyProductToCart, clearCart } = require('../Controllers/cartController');
const { createUser } = require('../Controllers/userController');
const {login, logout} = require('../Controllers/authController');
const { createProduct, getProduct, deleteProduct } = require('../Controllers/productController');
const { uploader } = require('../Middleware/multerMiddleware');
const { isLoggedIn, isAdmin, isUser } = require('../Validation/authValidator');
const { newOrder, myOrders, myOrderById, updateOrder } = require('../Controllers/orderController');


const cartRouter = express.Router();
const userRouter = express.Router();
const authRouter = express.Router();
const productRouter = express.Router();
const getProductRouter = express.Router();
const deleteProductRouter = express.Router();
const orderRouter = express.Router();


// we have to initialize a router object to add routes in a new file /
// Routers are used for segregating your routes in different modules
cartRouter.get('/', isLoggedIn ,getCartById);
cartRouter.post('/:operation/:productId', isLoggedIn , modifyProductToCart);
cartRouter.delete('/clear/', isLoggedIn ,clearCart);
userRouter.post('/', createUser);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
productRouter.post('/products',isLoggedIn, isAdmin, uploader.single('files'), createProduct);
getProductRouter.get('/:_id', getProduct);
deleteProductRouter.delete('/delete/:_id', deleteProduct);
orderRouter.post('/', isLoggedIn, isUser , newOrder);
orderRouter.get('/', isLoggedIn, isUser, myOrders);
orderRouter.get('/:id', isLoggedIn, myOrderById);
orderRouter.patch('/update/:id', isLoggedIn, isAdmin , updateOrder);


module.exports = {
    cartRouter,
    userRouter,
    authRouter,
    productRouter,
    getProductRouter,
    deleteProductRouter,
    orderRouter
}






