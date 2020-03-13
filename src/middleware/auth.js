const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errors');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for Authorization Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check for token
    if (!token) return next(new ErrorResponse(`Você não é autorizado a acessar esta rota`, 401));

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Finda autheticated user
        req.user = await User.findById(decoded.id);

        next();
    } catch (err) {
        return next(new ErrorResponse(`Você não é autorizado a acessar esta rota`, 401));
    }
});