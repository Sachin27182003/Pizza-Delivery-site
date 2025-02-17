const user = require('../Schema/userSchema');


    
 
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
            const response = user.create(userDetails);
            return response;
        } catch (error) {
            console.log(error.message);
        }
      
    }

module.exports = {
    findUser,
    createUser
}