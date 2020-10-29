const User = require('../models/users');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client("501610522296-9hulmt8l52p612p0s5th7k43jevlaqkr.apps.googleusercontent.com")
const fetch = require('node-fetch');


exports.signup = (req, res) => {
    const user = new User(req.body);
    const { username } = user;

    User.findOne({ username }, (error, fUser) => {
        if (fUser) return res.status(401).json({
            error: 'Username đã tồn tại'
        });
        user.save((error, user) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.json(user)
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
    userProperty: 'auth'
});



exports.signinWithGoogle = (req, res) => {
    const { tokenId } = req.body;
    client.verifyIdToken({ idToken: tokenId, audience: "501610522296-9hulmt8l52p612p0s5th7k43jevlaqkr.apps.googleusercontent.com" })
        .then(async (response) => {
            const { sub, email, name, email_verified } = response.payload;
            if (email_verified) {
                let existingUser = await User.findOne({ googleId: sub });
                if (!existingUser) {
                    console.log("create new")
                    const user = await new User({
                        googleId: sub, email,
                        name: response.payload.name
                    }).save();
                    token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                    res.cookie('token', token, { expires: new Date(Date.now() + 86400) })
                    const { _id, name } = user;
                    res.json({
                        token: token,
                        user: {
                            _id,
                            name
                        }
                    })
                } else {
                    const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);
                    res.cookie('token', token, { expires: new Date(Date.now() + 86400) })
                    const { _id, name } = existingUser;
                    res.json({
                        token: token,
                        user: {
                            _id,
                            name
                        }
                    })
                }
            }

        })

}

exports.signinWithFacebook = async (req, res) => {
    const { accessToken, userID } = req.body;
    fetch(`https://graph.facebook.com/v2.11/${userID}?fields=id,name,email&access_token=${accessToken}`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(async data => {
            const { name, id, email } = data;
            let existingUser = await User.findOne({ facebookId: id });
            if (!existingUser) {
                const user = await new User({ facebookId: id, email, name: data.name }).save();
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
                res.cookie('token', token, { expires: new Date(Date.now() + 86400) })
                const { _id, name } = user;
                res.json({
                    token: token,
                    user: {
                        _id,
                        name
                    }
                })
            } else {
                const token = jwt.sign({ _id: existingUser._id }, process.env.JWT_SECRET);
                res.cookie('token', token, { expires: new Date(Date.now() + 86400) })
                const { _id, name } = existingUser;
                res.json({
                    token: token,
                    user: {
                        _id,
                        name
                    }
                })
            }
        })
}
