const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                error: 'Email đã được sử dụng'
            })
        }
        user.salt = undefined;
        user.hash_password = undefined;
        res.json({
            user
        })
    })
}

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (error, user) => {
        if (error || !user) {
            return res.status(400).json({
                error: 'Email không đúng'
            })
        }
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Mật khẩu không đúng'
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { expires: new Date(Date.now() + 86400) })
        const { _id, email, name } = user;
        res.json({
            token: token,
            user: {
                _id,
                email,
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
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie('token', token, { expires: new Date(Date.now() + 86400) })
    const { _id, email, name } = user;
    res.json({
        token: token,
        user: {
            _id,
            email,
            name
        }
    })
}