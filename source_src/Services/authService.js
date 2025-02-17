const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authFindUser } = require("../Repositories/authRepositories");
const { JWT_SECRET, JWT_EXPIRY } = require('../config/serverConfig');

async function validateLogin(authDetails){

    const email =authDetails.email;
    const plainPassword = authDetails.password;

     // Check if the user exist or not
     const user = await authFindUser({email});

     if(!user){
        throw {message: "No user Found Please Register first", statusCode: 404}
     }

     //If user found we need to compare plain password to hashed password
     const isPasswordValidated = await bcrypt.compare(plainPassword, user.password);

     if(!isPasswordValidated){
        throw { message: "Invalid Password, Please Try again!!", statusCode: 401}
     }

     const userRole = user.role ? user.role : "USER"

     // If the password is validated create a token and return it
     const token = jwt.sign({email: user.email, id: user._id, role: userRole}, JWT_SECRET, {expiresIn: JWT_EXPIRY});

     return token;
} 


module.exports = {
   validateLogin
}