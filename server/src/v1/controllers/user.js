import JWT from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import User from '../models/user.js';

export const register = async (req, res) => {
    // receive password
    const { username, password } = req.body;

    try {
        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 12);
        // create user
        const user = await User.create({
            username,
            password: hashedPassword
        });
        await user.save();
        // JWT
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SK, { expiresIn: '24h' });
        return res.status(200).json({ user, token });
    } catch (err) {
        return res.status(500).json('Failed to create user')
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // check if the user exists
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({
                errors: [{
                    param: 'username',
                    msg: 'User does not exist'
                }]
            });
        }

        // check if the password is correct
        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            return res.status(401).json({
                errors: [{
                    param: 'password',
                    msg: 'Wrong password',
                }]
            })
        } 
        // JWT
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SK, { expiresIn: '24h' });

        return res.status(200).json({ user, token });

    } catch (err) {
        return res.status(500).json(err);
    }
};
