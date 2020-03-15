const crypto = require('crypto');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const sendMail = require('../utils/sendMail');
const User = require('../models/User');
const Token = require('../models/Token');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;
    
    // Create user
    const user = await User.create({ name, email, password });

    // Create verification token
    const token = await Token.createToken(user, 10);
    
    // Send email
    const url = `${req.protocol}://${req.get('host')}/api/v1/accountverification/${token}`;
    const options = {
        email: user.email,
        subject: 'Confirme sua conta do Instagram',
        message: `Para terminar de criar sua conta no Instagram, confirme seu endereço de email clicando neste link: ${url}`
    };

    try {    
        await sendMail(options);

        res.status(200).json({
            success: true,
            data: `Email enviado com sucesso para ${user.email}`
        })
    } catch (err) {
        await token.remove();
        return next(new ErrorResponse(`Erro ao enviar email`, 500));
    }
});

// @desc    Account verification
// @routes  PUT /api/v1/auth/accountverification/:verificationtoken
// @access  Public
exports.accountVerification = asyncHandler(async (req, res, next) => {
    // Match token
    const token = await Token.matchToken(req.params.verificationtoken);
    if (!token) return next(new ErrorResponse(`Token inválido`, 404));
    
    // Check for user
    const user = await User.findOne({ _id: token.user, email: req.body.email });
    if (!user) return next(new ErrorResponse(`Endereço de email informado está incorreto.`, 400));
 
    // Verify user email
    user.isVerified = true;
    await user.save();

    // Delete verification token
    await Token.deleteMany({ user: token.user });

    sendTokenResponse(user, 200, res);
});


// @desc    Resend account verification token
// @routes  PUT /api/v1/auth/resendtoken
// @access  Public
exports.resendToken = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    
    // Check for registered user
    if (!user) return next(new ErrorResponse(`Não foi encontrado nenhum usuário com o email ${req.body.email}.`, 404));

    // Make sure user is not verified
    if (user.isVerified) return next(new ErrorResponse(`Esta conta já está verificada.`, 401));
    
    // Create verification token
    const token = await Token.createToken(user, 10);

    // Send email
    const url = `${req.protocol}://${req.get('host')}/api/v1/accountverification/${token}`;
    const options = {
        email: user.email,
        subject: 'Confirme sua conta do Instagram',
        message: `Para terminar de criar sua conta no Instagram, confirme seu endereço de email clicando neste link: ${url}`
    };

    try {    
        await sendMail(options);

        res.status(200).json({
            success: true,
            data: `Email enviado com sucesso para ${user.email}`
        })
    } catch (err) {
        await token.remove();
        return next(new ErrorResponse(`Erro ao enviar email`, 500));
    }
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

    // Check for verified user
    if (!user.isVerified) return next(new ErrorResponse(`Para prosseguir é necessário verificar seu email`, 401));
    
    // Send token response
    sendTokenResponse(user, 200, res);
});

// @desc    Logout User
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
    res.status(200).cookie('token', undefined, {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    }).json({
        success: true,
        data: {}
    })
});

// @desc    Get logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        data: user
    })
});

// @desc    Update user details
// @route   PUT /api/v1/auth/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
    const { email, name } = req.body;

    const user = await User.findByIdAndUpdate(req.user.id, { email, name }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: user
    });
});

// @desc    Update user password
// @route   PUT /api/v1/auth/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
    if (!req.body.currentPassword || !req.body.newPassword) return next(new ErrorResponse(`Informe a senha atual e a nova.`, 400));

    let user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);
    if (!isMatch) return next(new ErrorResponse(`Senha atual está incorreta`, 400));

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    // Check for user
    if (!user) return next(new ErrorResponse(`Não foi encontrado nenhum usuário com o email ${req.body.email}.`, 404));

    // Make sure user is verified
    if (!user.isVerified) return next(new ErrorResponse(`Para prosseguir é necessário verificar seu email.`, 401));
    
    // Create token
    const token = await Token.createToken(user, 10);

    // Email options
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${token}`;
    const options = {
        email: user.email,
        subject: `Redefinição de senha do Instagram`,
        message: `Recebemos uma solicitação para redefinir a senha de sua conta.\nCaso você tenha solicitado uma redefinição faça uma requisição PUT para ${resetUrl}.\nSe você não fez essa solicitação, ignore este email.`
    };

    try {
        await sendMail(options);
        
        res.status(200).json({
            success: true,
            data: `Email enviado com sucesso para ${user.email}`
        })
    } catch (err) {
        await token.remove();

        return next(new ErrorResponse(`Erro ao enviar email`, 500));
    }
});

// @desc    Reset password
// @route   PUT /api/v1/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
    // Match token
    const token = await Token.matchToken(req.params.resettoken);
    if (!token) return next(new ErrorResponse(`Token inválido`, 404));
    
    // Check for user
    const user = await User.findOne({ _id: token.user, email: req.body.email });
    if (!user) return next(new ErrorResponse(`Endereço de email informado está incorreto`, 400));

    // Update user password
    user.password = req.body.password;

    // Save user
    await user.save();

    // Delete token
    await Token.deleteMany({ user: token.user });
    
    sendTokenResponse(user, 200, res);
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