import { body, validationResult } from 'express-validator';

import User from '../models/user.js';

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

const userSignUpValidationRules = () => {
    return [
        body('username')
            .isLength({ min: 4 })
            .withMessage('User name should have more than 4 letters'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password should be more than 8 letters long'),
        body('confirmPassword')
            .isLength({ min: 8 })
            .withMessage('Password should be more than 8 letters long'),
        body('username').custom((value => {
            return User.findOne({ username: value }).then((user) => {
                if (user) {
                    return Promise.reject('This user name exists already');
                }
            })
        }))
    ]
};

const userLoginValidationRules = () => {
    return [
        body('username')
            .isLength({ min: 4 })
            .withMessage('User name should have more than 4 letters'),
        body('password')
            .isLength({ min: 8 })
            .withMessage('Password should be more than 8 letters long')
    ]
};

export { validate, userSignUpValidationRules, userLoginValidationRules };