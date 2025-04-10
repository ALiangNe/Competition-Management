// const Profile = require('../models/Profile');

// // 通过存入token里面的id来获取用户数据
// exports.getProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await Profile.findById(userId);
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.updateUserProfile = async (req, res) => {
//     const { id, username, email, password, role, name, bio, avatarUrl } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await Profile.updateUserProfile(id, { username, email, password: hashedPassword, role, name, bio, avatarUrl });
        
//         if (result) {
//             res.status(200).json({ message: 'Profile updated successfully' });
//         } else {
//             res.status(400).json({ message: 'Failed to update profile' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };


// const Profile = require('../models/Profile');
// const bcrypt = require('bcryptjs');

// // 通过存入token里面的id来获取用户数据
// exports.getProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await Profile.findById(userId);
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };

// exports.updateUserProfile = async (req, res) => {
//     const { id, username, email, password, role, name, bio, avatarUrl } = req.body;

//     try {
//         // 打印传入的参数
//         console.log('Updating user profile with data:', { id, username, email, password, role, name, bio, avatarUrl });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await Profile.updateUserProfile(id, { username, email, password: hashedPassword, role, name, bio, avatarUrl });

//         if (result) {
//             res.status(200).json({ message: 'Profile updated successfully' });
//         } else {
//             res.status(400).json({ message: 'Failed to update profile' });
//         }
//     } catch (error) {
//         console.log('Error updating user profile:', error);
//         res.status(500).json({ message: error.message });
//     }
// };


// controllers/profileController.js
// const bcrypt = require('bcryptjs');
// const Profile = require('../models/Profile');

// // 获取用户资料
// exports.getProfile = async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await Profile.findById(userId);
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: 'User not found' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };

// // 更新用户资料
// exports.updateUserProfile = async (req, res) => {
//     const { id, username, email, password, role, name, bio, avatarUrl } = req.body;

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await Profile.updateUserProfile(id, { username, email, password: hashedPassword, role, name, bio, avatarUrl });
        
//         console.log(`Updating user profile with data: ${JSON.stringify({ id, username, email, password, role, name, bio, avatarUrl })}`);
//         console.log(`Update result: ${result}`);

//         if (result) {
//             res.status(200).json({ message: 'Profile updated successfully' });
//         } else {
//             res.status(400).json({ message: 'Failed to update profile' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: error.message });
//     }
// };


const bcrypt = require('bcryptjs');
const Profile = require('../models/Profile');

exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await Profile.findById(userId);
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

exports.updateUserProfile = async (req, res) => {
    const { id, username, email, password, role, name, bio, avatarUrl } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await Profile.updateUserProfile(id, { username, email, password: hashedPassword, role, name, bio, avatarUrl });
        
        console.log(`Updating user profile with data: ${JSON.stringify({ id, username, email, password, role, name, bio, avatarUrl })}`);
        console.log(`Update result: ${result}`);

        if (result) {
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(400).json({ message: 'Failed to update profile' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
