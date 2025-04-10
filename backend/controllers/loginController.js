const Login = require('../models/Login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '202202532';// 学号

exports.loginUser = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await Login.findByUsernameAndRole(username, role);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1d' });
            res.status(200).json({ token, user: { username: user.username, avatarUrl: user.avatarUrl, role: user.role } });
        } else {
            res.status(401).json({ message: 'Invalid username, password, or role' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

// 导航项“个人信息”
exports.getUserProfile = async (req, res) => {
    const userId = req.user.id; // 从JWT中获取用户ID

    try {
        const user = await Login.findById(userId);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

