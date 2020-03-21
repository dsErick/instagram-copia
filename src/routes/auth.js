const express = require('express');
const router = express.Router();
const { register, accountVerification, resendToken, login, logout, getMe, getToken, updateDetails, updatePassword, forgotPassword, resetPassword } = require('../controllers/AuthController');
const { protect } = require('../middleware/auth');

router.post('/register', register);
router.put('/accountverification/:verificationtoken', accountVerification);
router.put('/resendtoken', resendToken);
router.post('/login', login);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);

router.get('/token', getToken);

router.put('/updatedetails', protect, updateDetails);
router.put('/updatepassword', protect, updatePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;