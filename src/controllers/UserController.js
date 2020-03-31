const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const User = require('../models/User');

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = asyncHandler(async (req, res, next) => {
    const query = req.query.s || '';
    
    const users = await User.find({
        $or: [
            { 'name': { $regex: query, $options: 'i'} },
            { 'username': { $regex: query, $options: 'i'} }
        ],
        isVerified: true, role: 'user'
    });

    res.status(200).json({
        success: true,
        count: users.length,
        data: users
    })
});

// @desc    Get all users
// @route   GET /api/v1/users/:id
// @access  Public
exports.getUser = asyncHandler(async (req, res, next) => {
    const objId = (require('mongoose').Types.ObjectId.isValid(req.params.id)) ? req.params.id : '123456789012';
    
    const user = await User.findOne({
        $or: [{ _id: objId }, { username: req.params.id }], isVerified: true, role: 'user'
    }).populate({ path: 'posts', options: { sort: '-createdAt' }});

    if (!user) return next(new ErrorResponse(`Não foi encontrado nenhum usuário ${req.params.id}`, 404));
    
    res.status(200).json({
        success: true,
        data: user
    })
});

// @desc    Create user
// @route   POST /api/v1/users
// @access  Private/admin
exports.createUser = asyncHandler(async (req, res, next) => {
    const user = await User.create(req.body);

    res.status(201).json({
        success: true,
        data: user
    })
});

// @desc    Update user
// @route   PUT /api/v1/users/:id
// @access  Private/admin
exports.updateUser = asyncHandler(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!user) return next(new ErrorResponse(`Não foi encontrado nenhum usuário com id ${req.params.id}`, 404));

    res.status(200).json({
        success: true,
        data: user
    })
});

// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Private/admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorResponse(`Não foi encontrado nenhum usuário com id ${req.params.id}`, 404));

    await user.remove();

    res.status(200).json({
        success: true,
        data: {}
    })
});