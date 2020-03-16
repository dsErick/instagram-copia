const express = require('express');
const router = express.Router();
const { getPosts, getPost, addPost, updatePost, deletePost } = require('../controllers/PostController');
const { protect } = require('../middleware/auth');


router.route('/:userId').get(getPosts);
router.route('/')
    .get(getPosts)
    .post(protect, addPost);
router.route('/:id')
    .get(getPost)
    .put(protect, updatePost)
    .delete(protect, deletePost);

module.exports = router;