const fs = require('fs');
const sharp = require('sharp');
const asyncHandler = require('../middleware/async')
const ErrorResponse = require('../utils/errors');
const Post = require('../models/Post');

// @desc    Get all post
// @route   GET /api/v1/posts
// @route   GET /api/v1/posts/:userId
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    const posts = await Post.find(req.params.userId ? { user: req.params.userId } : {});
    
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
    req.body.user = req.user.id;
    req.body.author = req.user.name;

    // Check for image
    if (!req.files || !req.files.image) return next(new ErrorResponse(`Informe uma imagem para a postagem`, 400));

    // Make sure the file is a image
    if (!req.files.image.mimetype.startsWith('image')) return next(new ErrorResponse(`Informe uma imagem para a postagem`, 400));
    
    // Post image name
    const imageName = `IMG_${new Date().toISOString().replace(/T/, '_').replace(/\..+/, '').replace(/[-:]/g, '')}_${Math.floor(Math.random() * 1000) + 1}.jpg`;
    
    req.body.image = imageName;

    const post = await Post.create(req.body);
    
    // Resize and save image
    await sharp(req.files.image.data).resize(1080, 1350).toFile(`${process.env.POST_IMAGE_PATH}/${imageName}`);

    res.status(200).json({
        success: true,
        data: post
    })  
});

// @desc    Update post
// @route   PUT /api/v1/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
    let post = await Post.findById(req.params.id);

    // Check for post
    if (!post) return next(new ErrorResponse(`Não foi encontrado nenhum post com o id ${req.params.id}`, 404));

    // Make sure logged in user is post owner
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') return next(new ErrorResponse(`Você não é autorizado a atualizar este post.`, 401));
    
    post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        data: post
    })
});


// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
    let post = await Post.findById(req.params.id);

    // Check for post
    if (!post) return next(new ErrorResponse(`Não foi encontrado nenhum post com o id ${req.params.id}`, 404));

    // Make sure logged in user is post owner
    if (post.user.toString() !== req.user.id && req.user.role !== 'admin') return next(new ErrorResponse(`Você não é autorizado a apagar este post.`, 401));

    // Delete image
    fs.unlinkSync(`${process.env.POST_IMAGE_PATH}/${post.image}`);

    // Delete post
    await post.remove();
    
    res.status(200).json({
        success: true,
        data: {}
    })
});