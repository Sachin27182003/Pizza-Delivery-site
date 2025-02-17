const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor(resource){

        super(`Not able to find resource : ${resource}`, 404);

    }
}
                   

module.exports = NotFoundError;