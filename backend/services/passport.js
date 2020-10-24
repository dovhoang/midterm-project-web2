const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/key');

const User = require('../models/users')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/api/auth/google/callback',
        proxy: true
    },
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }

            const user = await new User({
                googleId: profile.id,
                email: profile.emails[0].email,
                name: profile.name.familyName + ' ' + profile.name.givenName
            }).save();
            done(null, user);
        })
);

passport.use(new FacebookStrategy({
    clientID: keys.facebook_key,
    clientSecret: keys.facebook_secret,
    callbackURL: keys.callback_url
},
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(async function () {
            const existingUser = await User.findOne({ facebookId: profile.id });
            if (existingUser) {
                return done(null, existingUser);
            }
            console.log(profile);
            const user = await new User({
                facebookId: profile.id,
                name: profile.displayName,
            }).save();
            return done(null, user);
        });
    }
));