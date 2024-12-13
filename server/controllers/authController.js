const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username Email and Password is required' });
        }

        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, email, password: hashedPassword });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and Password is required' });
        }

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({ message: 'User logged in successfully', token });
    }
    catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const logoutUser = async (req,res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { registerUser, loginUser, logoutUser };
