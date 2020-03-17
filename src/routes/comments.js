const express = require('express');
const router = express.Router({ mergeParams: true });
const { addComment, updateComment, deleteComment } = require('../controllers/CommentController');

router.route('/').post(addComment);
router.route('/:id')
    .put(updateComment)
    .delete(deleteComment);

module.exports = router;