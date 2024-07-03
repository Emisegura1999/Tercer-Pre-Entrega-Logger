const dictionaryErrors  = require("../services/errors/enum.js");

const ErrorManager = (error, req, res, next) => {
    console.warn(error.fact);
    switch (error.code) {
        case dictionaryErrors.INVALID_TYPE:
            res.send({
                status: "error",
                error: error.name
            });
            break;
        default:
            res.send({
                status: "error",
                error: "Error desconocido"
            });
    };
};

module.exports = ErrorManager;