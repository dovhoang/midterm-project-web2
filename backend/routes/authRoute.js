const express = require('express');
const router = express.Router();
const passport = require('passport');

const { userSignupValidator } = require('../validator')
const { signup, signin, signout, signinWithGoogle, requireSignin
} = require('../controllers/authController');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/profile', requireSignin, (req, res) => {
    res.send('profile');
});

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google'),
    signinWithGoogle
);

router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback',
    passport.authenticate('facebook'), signinWithGoogle);


module.exports = router;