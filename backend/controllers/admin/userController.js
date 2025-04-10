const User = require('../../models/admin/User');
const bcrypt = require('bcryptjs'); // 修改和创建用户要加密

// --Admin端
exports.getUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error('Failed to fetch users:', error);
        res.status(500).json({ message: 'Failed to fetch users' });
    }
};

// exports.createUser = async (req, res) => {
//     try {
//         const userId = await User.createUser(req.body);
//         res.status(201).json({ message: 'User created successfully', userId });
//     } catch (error) {
//         console.error('Failed to create user:', error);
//         res.status(500).json({ message: 'Failed to create user' });
//     }
// };

// exports.updateUser = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updatedData = req.body;
//         await User.updateUser(id, updatedData);
//         res.status(200).json({ message: 'User updated successfully' });
//     } catch (error) {
//         console.error('Failed to update user:', error);
//         res.status(500).json({ message: 'Failed to update user' });
//     }
// };

// ------加密
exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const salt = bcrypt.genSaltSync(10);
        userData.password = bcrypt.hashSync(userData.password, salt);
        const userId = await User.createUser(userData);
        res.status(201).json({ message: 'User created successfully', userId });
    } catch (error) {
        console.error('Failed to create user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        if (updatedData.password) {
            const salt = bcrypt.genSaltSync(10);
            updatedData.password = bcrypt.hashSync(updatedData.password, salt);
        }
        await User.updateUser(id, updatedData);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Failed to update user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Failed to delete user:', error);
        res.status(500).json({ message: 'Failed to delete user' });
    }
};
