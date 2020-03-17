const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errors');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

// @desc    Create a comment for a post
// @route   POST /api/v1/posts/:postId/comments
// @access  Private
exports.addComment = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    // Check for post
    if (!post) return next(new ErrorResponse(`Não foi encontrado nenhum post com o id ${req.params.postId}`, 404));

    req.body.user = req.user.id;
    req.body.post = post._id;

    const comment = await Comment.create(req.body);

    res.status(201).json({
        success: true,
        data: comment
    });
});

// @desc    Update a post comment
// @route   PUT /api/v1/posts/:postId/comments/:id
// @acces   Private
exports.updateComment = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    // Check for post
    if (!post) return next(new ErrorResponse(`Não foi encontrado nenhum post com o id ${req.params.postId}`, 404));

    let comment = await Comment.findById(req.params.id);

    // Check for comment
    if (!comment) return next(new ErrorResponse(`Não foi encontrado nenhum comentário com o id.`, 404));

    // Make sure logged in user is comment owner
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') return next(new ErrorResponse(`Você não é autorizado a atualizar este comentário.`, 401));

    comment = await Comment.findByIdAndUpdate(req.params.id, { body: req.body.body }, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: comment
    });
});

// @desc    Delete a post comment
// @route   DELETE /api/v1/posts/:postId/comments/:id
// @access  Private
exports.deleteComment = asyncHandler(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);

    // Check for post
    if (!post) return next(new ErrorResponse(`Não foi encontrado nenhum post com o id ${req.params.postId}`, 404));

    const comment = await Comment.findById(req.params.id);

    // Check for comment
    if (!comment) return next(new ErrorResponse(`Não foi encontrado nenhum comentário com o id.`, 404));

    // Make sure logged in user is comment owner
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') return next(new ErrorResponse(`Você não é autorizado a apagar este comentário.`, 401));

    await comment.remove();

    res.status(200).json({
        success: true,
        data: {}
    });
});
