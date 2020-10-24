const User = require('../models/users')

exports.userById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.user = user;
        next();
    });
};

exports.editProfile = (req, res) => {
    const user = req.user;
    const { name, email, team } = req.body;
    User.findOneAndUpdate({ _id: user._id }, { name: name, email: email, team: team })
        .exec((error, user) => {
            if (error) {
                return res.status(400).json(error);
            }
            return res.status(200).json({ message: "update success" })
        })
}

exports.changePassword = (req, res) => {
    const user = req.user;
    const { newPassword, oldPassword } = req.body;
    if (!user.authenticate(oldPassword)) {
        return res.status(401).json({
            error: 'Mật khẩu cũ không đúng'
        })
    }

    User.findOne({ _id: user._id })
        .exec((error, user) => {
            if (error) {
                return res.status(401).json({ error });
            }
            user.password = newPassword;
            user.save((error, updateUser) => {
                if (error) {
                    return res.status(400).json({ error });
                }
                user.salt = undefined;
                user.hash_password = undefined;
                res.json({
                    message: "password is changed"
                })
            })

        })

}
