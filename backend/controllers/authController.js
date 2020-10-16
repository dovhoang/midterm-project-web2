const User = require('../models/user');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signup = (req, res) => {
    const user = new User(req.body);
    user.save((error, user) => {
        if (error) {
            return res.status(400).json({
                error: 'email is taken!'
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

}