const asyncHandler = require('../middleware/async');

// @desc    Get all post
// @route   /api/v1/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        success: true,
        data: 'Success'
    })
});