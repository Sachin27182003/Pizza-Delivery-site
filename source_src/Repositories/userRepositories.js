const user = require('../Schema/userSchema');
const BadRequestError = require('../utils/BadRequestError');
const InternalServerError = require('../utils/internalServerError');


    
 
    async function findUser(parameters){
        try {
            const response = user.findOne({...parameters});
            return response;
        } catch (error) {
            console.log(err.message);
        }
       
    }

    async function createUser(userDetails){
        try {
            const response = await user.create(userDetails);
            return response;
        } catch (error) {
            if(error.name === 'ValidationError'){
                const errorMessageList = Object.keys(error.errors).map((property) => {
                    return error.errors[property].message;
                })
                throw new BadRequestError(errorMessageList);
            }
            console.log(error);
            throw new InternalServerError();
        }
      
    }

module.exports = {
    findUser,
    createUser
}