const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');
const UnauthorizedError = require('../utils/unAuthorisedError');

async function isLoggedIn(req, res, next){

    const token = req.cookies['authToken'];

    if(!token){
        return res.status(401).json({
            success: false,
            data: {},
            error: "Not authenticated",
            message: "No Authorisation token provided"
        });
    }

    try {
        const decoded = await jwt.verify(token, JWT_SECRET);

        if(!decoded){
           throw new UnauthorizedError();
        }
    
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role : decoded.role
        }
    
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Invalid token provided"
        });
    }
    
}

async function isAdmin(req, res, next){

    const loggedInUser = req.user;

    if(loggedInUser.role === 'ADMIN'){
        next();
    } else {
        return res.status(401).json({
            success: false,
            data: {},
            message: "You are not an Admin",
            error:{
                statusCode: 401,
                reason: "Unauthorized for this action" 
            }
        })
    }
}

async function isUser(req, res, next){

    const loggedInUser = req.user;

    if(loggedInUser.role === 'USER'){
        next();
    } else {
        return res.status(401).json({
            success: false,
            data: {},
            message: "You are not a USER",
            error:{
                statusCode: 401,
                reason: "Unauthorized for this action" 
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin,
    isUser
}
