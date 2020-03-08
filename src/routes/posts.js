const express = require('express');
const router = express.Router();
const { getPosts, getPost, addPost } = require('../controllers/PostController');

router.route('/')
    .get(getPosts)
    .post(addPost);
router.route('/:id')
    .get(getPost);

module.exports = router;