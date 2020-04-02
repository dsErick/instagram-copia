const express = require('express');
const router = express.Router({ mergeParams: true });
const { getPostComments, addComment, updateComment, deleteComment } = require('../controllers/CommentController');

router.route('/')
    .get(getPostComments)
    .post(addComment);
router.route('/:id')
    .put(updateComment)
    .delete(deleteComment);

module.exports = router;