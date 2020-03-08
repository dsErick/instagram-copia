const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const Post = require('../models/Post');

// @desc    Get all post
// @route   GET /api/v1/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find();
    
    res.status(200).json({
        success: true,
        count: posts.length,
        data: posts
    })
});

// @desc    Get single post
// @route   GET /api/v1/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.id);

    if (!post) return next(new ErrorResponse(`Não foi encontrado nenhum post com o id ${req.params.id}`));

    res.status(200).json({
        success: true,
        data: post
    })
});

// @desc    Create a post
// @route   POST /api/v1/posts
// @access  Private
exports.addPost = asyncHandler(async (req, res, next) => {
    const post = await Post.create(req.body);

    res.status(200).json({
        success: true,
        data: post
    })
});