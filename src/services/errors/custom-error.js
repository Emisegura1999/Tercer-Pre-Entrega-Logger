class CustomError {
    static createError({
        nameError = "Error",
        factError = "Desconocido",
        messageError, codeError = 1
    }) {
        const error = new Error(messageError);
        error.name = nameError;
        error.fact = factError;
        error.code = codeError;
        throw error;
    };
};

module.exports = CustomError;