const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParams){
        let message = "";
        invalidParams.forEach(params => message += `${params}\n `);

        super(`The Request has the following invalid Paramters \n ${invalidParams}`, 400);

    }
}
                   

module.exports = {
    BadRequestError
}   