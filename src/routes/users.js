const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser, followUser, unfollowUser, getUserFollowers, getUserFollowing } = require('../controllers/UserController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getUsers)
    .post(authorize('admin'), createUser);
    
router.route('/unfollow').delete(unfollowUser);

router.route('/:id')
    .get(getUser)
    .put(authorize('admin'), updateUser)
    .delete(authorize('admin'), deleteUser);

router.route('/:id/follow').put(followUser);

router.get('/:id/followers', getUserFollowers);
router.get('/:id/following', getUserFollowing);

module.exports = router;