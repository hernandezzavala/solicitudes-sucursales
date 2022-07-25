const { validationResult } = require("express-validator")

const checkErrors = (request, response, next) => {
    const errors = validationResult(request);
    if(!errors.isEmpty()) {
        return response.status(400).json(errors);
    }
    next();
}

module.exports = {
    checkErrors
}