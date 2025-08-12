import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const userData = req.body;

    try {
        // Hash the password before saving
        const passwordHashed = await bcrypt.hash(userData.password, 10);
        userData.password = passwordHashed;

        // save the user to the database
        const newUser = new User(userData);
        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });

        // Set the access token in a cookie and respond with the user data
        res.cookie('accessToken', token)
        res.status(201).json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const login = async (req, res) => {
    const userData = req.body;

    try {
        // Find the user by username
        const user = await User.findOne({ username: userData.username });

        if (!user || user.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // compare the password stored in the database with the password provided by the user
        const isCorrectPsswd = await bcrypt.compare(userData.password, user.password);

        if (!isCorrectPsswd) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // generare an access token
        const token = await createAccessToken({ id: user._id });

        // Set the access token in a cookie and respond with the user data
        res.cookie('accessToken', token)
        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
        });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const logout = (req, res) => {
    // Clear the access token cookie
    res.clearCookie('accessToken');

    // Respond with a success message
    res.status(200).json({ message: 'Logged out successfully' });
}

// this is not a public route, so the user must be authenticated to access it
// its an example of how to use the JWT token to get the user data and the middleware is already implemented in the routes
export const profile = async (req, res) => {
    const user = await User.findById(req.user.id)

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({
        id: user._id,
        username: user.username,
        email: user.email
    });
}