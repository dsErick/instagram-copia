const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    // Create user
    const user = await User.create({ name, email, password });

    // Send token response
    sendTokenResponse(user, 200, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password were provided
    if (!email && !password) return next(new ErrorResponse(`Informe o email e senha`, 400));
    
    // Find user
    const user = await User.findOne({ email }).select('+password');

    // Check for user
    if (!user) return next(new ErrorResponse(`Email ou senha inválidos`, 400));

    // Match password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(new ErrorResponse(`Email ou senha inválidos`, 400));

    // Send token response
    sendTokenResponse(user, 200, res);
});

// @desc    Get logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: user
    })
});

// Get JWT, create cookie and send response
const sendTokenResponse = asyncHandler(async (user, statusCode, res) => {
    // Get Signed JWT
    const token = user.getSignedJWT();
    
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    // Set secure cookie if production mode
    if (process.env.NODE_ENV === 'production') options.secure = true;
    
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token
    })
});