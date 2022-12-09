import express from 'express';

import { userLoginValidationRules, userSignUpValidationRules, validate } from '../middleware/validation.js';
import { register } from '../controllers/user.js';
import { login } from '../controllers/user.js';
import { verifyToken } from '../middleware/tokenHandler.js';

const router = express.Router();

// Sign up
router.post(
    '/register',
    userSignUpValidationRules(),
    validate,
    register
);

// Login
router.post('/login', userLoginValidationRules(), login);

// JWT API
router.post('/verify-token', verifyToken, (req, res) => {
    return res.status(200).json({ user: req.user });
})


export default router;