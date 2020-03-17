const express = require('express');
const router = express.Router();
const { getPosts, getPost, addPost, updatePost, deletePost } = require('../controllers/PostController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getPosts)
    .post(addPost);
router.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);

router.use('/:postId/comments', require('./comments'));

module.exports = router;