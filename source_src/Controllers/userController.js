const {registerUser} = require('../Services/userService');


async function createUser(req, res){
    console.log(req.body);

    try {
        const response = await registerUser(req.body);
        return res.status(201).json({
            message: "User Registered successfully",
            success: true,
            data: response,
            error: {}
        })
        
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            success: false,
            data: {},
            error: error.message,
            statusCode: error.statusCode
        })
    }
}

module.exports = {
    createUser
}