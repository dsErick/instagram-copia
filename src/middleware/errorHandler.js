const ErrorResponse = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
    console.error('\x1b[31m' + err.stack + '\x1b[0m');

    let error = { ...err };
    error.message = err.message;
    
    // Mongoose CastError
    if (err.name === 'CastError') {
        const message = `Não foi encontrado nenhum ${err.model.modelName} com o id ${err.value}`;
        error = new ErrorResponse(message, 404);
    }
    
    // Mongoose duplicate key value
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue);
        const message = `Valor informado no campo '${field}' já se encontra em uso`;
        error = new ErrorResponse(message, 400);
    }
    
    // Mongoose ValidationError
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    // Send response
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })
};

module.exports = errorHandler;