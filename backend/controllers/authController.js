const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const user = new User(req.body);
    const { username } = user;

    User.findOne({ username }, (error, fUser) => {
        if (fUser) return res.status(401).json({
            error: 'Username đã tồn tại'
        });
        user.save((error, user) => {
            user.salt = undefined;
            user.hash_password = undefined;
            res.json({
                user: user
            })
        })

    })



}

exports.signin = (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'Username không đúng'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Mật khẩu không đúng'
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { expires: new Date(Date.now() + 86400) })
        const { _id, username, name } = user;
        res.json({
            token: token,
            user: {
                _id,
                username,
                name
            }
        })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json("Signout success!")
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ['RS256']
});

exports.signinWithGoogle = (req, res) => {
    const user = req.user;
    console.log(user);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { expires: new Date(Date.now() + 86400) })
    const { _id, username, name } = user;
    res.json({
        token: token,
        user: {
            _id,
            username,
            name
        }
    })
}
