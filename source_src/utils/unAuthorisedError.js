const AppError = require("./appError");

class UnauthorizedError extends AppError{
    constructor(){

        super(`User is not authorised properly`, 401);

    }
}
                   

module.exports = UnauthorizedError;