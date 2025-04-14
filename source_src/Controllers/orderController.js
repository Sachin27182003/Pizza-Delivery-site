const { createOrder, getOrders, getOrderById, modifyOrder } = require("../Services/orderService");
const AppError = require("../utils/appError");

async function newOrder(req, res) {
    console.log("📦 New Order Request:", req.body);

    try {
        const order = await createOrder(req.user.id, req.body.paymentMethod, req.body.address);

        if (order === false) {
            return res.status(200).json({
                success: false,
                message: "Cart is empty",
                error: {},
                data: {},
            });
        }

        return res.status(200).json({
            success: true,
            message: "Ordered Successfully",
            error: {},
            data: order,
        });

    } catch (error) {

        return res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: {},
            data: {},
        });
    }
}



async function myOrders(req, res){

    try {
        const orders = await getOrders(req.user.id)

        return res.status(200).json({
            success: true,
            message: "Successfully fetched the orders",
            error: {},
            data: orders
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
            data: {} 

        })
    }
}

async function myOrderById(req, res){

    try {
        const order = await getOrderById((req.params.id))

        return res.status(200).json({
            success: true,
            message: "Successfully fetched the order",
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
            data: {} 

        })
    }
}

async function updateOrder(req, res){

    console.log(req.body)


    try {
        const order = await modifyOrder(req.params.id, req.body.address, req.body.status)

        return res.status(200).json({
            success: true,
            message: "Successfully fetched the order",
            error: {},
            data: order
        })
    } catch (error) {
        console.log(error);
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
            data: {} 

        })
    }
}
    
module.exports = {
    newOrder,
    myOrders,
    myOrderById,
    updateOrder
}