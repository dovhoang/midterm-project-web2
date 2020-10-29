const express = require('express');
const router = express.Router();
const passport = require('passport');

const { userSignupValidator } = require('../validator')
const { signup, signin, signout, signinWithGoogle, signinWithFacebook
} = require('../controllers/authController');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.post('/signin/google', signinWithGoogle);
router.post('/signin/facebook', signinWithFacebook);



module.exports = router;