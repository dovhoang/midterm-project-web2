//ref: Udemy course
exports.userSignupValidator = (req, res, next) => {
    req.check('username', 'User name is required').notEmpty();
    req.check('username')
        .matches(/^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/)
        .withMessage('Invalid username ()')

    req.check('name', 'Name is required').notEmpty();
    req.check('name')
        .isLength({ min: 2 })
        .withMessage('Name must contain at least 2 characters')


    req.check('password', 'Password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6 })
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number');
    const errors = req.validationErrors();
    if (errors) {
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({ error: firstError });
    }
    next();
};
