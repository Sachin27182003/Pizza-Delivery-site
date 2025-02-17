const {validateLogin} = require('../Services/authService');

async function login(req, res){

    
    try {
        const loginPayload = req.body;

        const response = await validateLogin(loginPayload);

        res.cookie("authToken", response, {
            httpOnly : true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        
        return res.status(200).json({
            success: true,
            message: "logged in successfully",
            data: {},
            error: {}
        })
    } catch (error) {
        let errorMessage = error.message;
        if (error.errors) {
            if (error.errors.email.message && error.errors.email.message) {
                errorMessage = error.errors.email.message;
            } else if (error.errors.mobileNumber.message && error.errors.mobileNumber.message) {
                errorMessage = error.errors.mobileNumber.message;
            }
        }
        return res.status(error.statusCode || 500).json({
            success: false,
            data: {},
            error: errorMessage,
            statusCode: error.statusCode
        })
    }
}

async function logout(req, res){

    res.cookie("authToken", "", {
        httpOnly : true,
        secure: true,
    });

    return res.status(200).json({
        success: true,
        message: "logged out successfully",
        error: {},
        data: {}
        
    })
}

module.exports = {
    login,
    logout
    
}