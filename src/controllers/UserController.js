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

// @desc    Follow a user
// @route   PUT /api/v1/users/:id/follow
// @access  Private
exports.followUser = asyncHandler(async (req, res, next) => {
    const loggedUser = await User.findById(req.user._id);
    const followedUser = await User.findById(req.params.id);

    // Check for followed user exists
    if (!followedUser) return next(new ErrorResponse(`Não foi encontrado nenhum usuário com id ${req.params.id}`, 404));
    
    // Make sure user does not follow itself
    if (loggedUser._id.toString() === followedUser._id.toString()) return next(new ErrorResponse(`Não é possível seguir seu próprio perfil.`, 401));

    // Make sure user is not already beeing followed
    if (loggedUser.following.indexOf(followedUser._id) !== -1) return next(new ErrorResponse(`O usuário ${req.params.id} já está sendo seguido`, 401));

    loggedUser.following.push(followedUser);
    followedUser.followers.push(loggedUser);

    await loggedUser.save();
    await followedUser.save();
    
    Object.values(req.currentConnections).forEach(conn => {
        if (conn.userId === req.params.id) req.io.to(conn.socketId).emit('newFollower', loggedUser.username);
    });

    res.status(200).json({
        success: true,
        data: `Usuário ${req.params.id} seguido`
    });
});

// @desc    Unfollow a user
// @route   DELETE /api/v1/users/unfollow
// @access  Private
exports.unfollowUser = asyncHandler(async (req, res, next) => {
    const followeeUser = await User.findById(req.body.followeeUser);
    const followerUser = await User.findById(req.body.followerUser);

    if (!followerUser) return next(new ErrorResponse(`Não foi encontrado nenhum usuário com id ${req.body.followerUser}`, 404));

    // Make sure user is beeing followed
    const userIndex = followeeUser.followers.indexOf(followerUser._id);
    if (userIndex === -1) return next(new ErrorResponse(`O usuário ${req.body.followerUser} não segue ${req.body.followeeUser}`, 404));

    followeeUser.followers.splice(userIndex, 1);
    followerUser.following.splice(followerUser.following.indexOf(followeeUser._id), 1);

    await followeeUser.save();
    await followerUser.save();
    
    res.status(200).json({
        success: true,
        data: `O usuário ${followerUser._id} deixou de seguir ${followeeUser._id}`
    });
});