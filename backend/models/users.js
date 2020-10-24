const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true
        },
        googleId: String,
        facebookId: String,
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        email: {
            type: String,
            trim: true,
            maxlength: 64,
            unique: true,
        },
        team: {
            type: String,
            trim: true,
            maxlength: 128
        },
        hash_password: {
            type: String
        },
        salt: String,
    },
    { timestamps: true }
);

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = uuidv4();
        this.hash_password = this.encryptPassword(password);
    })
    .get(() => {
        return this._password;
    })

userSchema
    .methods = {
    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return '';
        }
    },
    authenticate: function (plaintText) {
        return this.hash_password === this.encryptPassword(plaintText);
    }
};

module.exports = mongoose.model('User', userSchema);