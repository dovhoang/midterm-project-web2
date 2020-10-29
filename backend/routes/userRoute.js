const express = require('express');
const router = express.Router();

const { requireSignin } = require('../controllers/authController');
const { editProfile, userById, changePassword, getProfile } = require('../controllers/userController');

router.get('/user/:userId', requireSignin, getProfile);
router.put('/user/:userId/update', editProfile);
router.put('/user/:userId/changepassword', changePassword);

router.param('userId', userById)
module.exports = router;