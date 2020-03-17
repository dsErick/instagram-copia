const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/UserController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getUsers)
    .post(authorize('admin'), createUser);
router.route('/:id')
    .get(getUser)
    .put(authorize('admin'), updateUser)
    .delete(authorize('admin'), deleteUser);

module.exports = router;