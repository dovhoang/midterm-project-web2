const express = require('express');
const router = express.Router();
const { userSignupValidator } = require('../validator')
const { signup, signin, signout, requireSignin
} = require('../controllers/authController');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.post('/signout', signout);
router.get('/profile', requireSignin, (req, res) => {
    res.send('profile');
});


module.exports = router;