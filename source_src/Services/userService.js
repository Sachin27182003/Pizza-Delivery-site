
const { createCart } = require('../Repositories/cartRepositories')
const {findUser, createUser} = require('../Repositories/userRepositories')


    
async function registerUser(userDetails){
    // it will create a brand new user in database;
    //we need to check if the user with this email and mobile number already exists or not
    const user = await findUser({
        $or: [
        {email: userDetails.email},
        {mobileNumber: userDetails.mobileNumber}
        ]
    })
    
    //if user not found 
    if(user){
        throw { message: "User already exist", statusCode: 409}
    }

    // if not then create a new user in the database;
    const newUser = await createUser({

        firstName : userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber,
        email: userDetails.email,
        password: userDetails.password,
        role: userDetails.role
    })


    if(!newUser){
        throw { message : "Something went wrong, Unable to create user", statusCode: 500}
    }

    // will create a cart 
    await createCart(newUser._id);

    //return the details of new user
    return newUser;


}

module.exports = {
    registerUser
}