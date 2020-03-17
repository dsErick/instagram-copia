const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errors');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check for Authorization Bearer token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Check for token
    if (!token) return next(new ErrorResponse(`Para acessar esta rota é necessário fazer login.`, 401));

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find autheticated user
        req.user = await User.findById(decoded.id);

        if (!req.user.isVerified) return next(new ErrorResponse(`Para prosseguir é necessário verificar seu email.`, 401));
        
        next();
    } catch (err) {
        return next(new ErrorResponse(`Para acessar esta rota é necessário fazer login.`, 401));
    }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) return next(new ErrorResponse(`Você não é autorizado a acessar esta rota.`, 401));

        next();
    }
}