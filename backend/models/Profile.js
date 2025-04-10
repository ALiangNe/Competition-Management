// const db = require('../utils/db');

// // 个人信息的模型
// class Profile {
//     // 获取个人信息资料
//     static async findById(id) {
//         const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
//         return rows.length > 0 ? rows[0] : null;
//     }

//      // 更新个人信息资料
//      static async updateUserProfile(id, { username, email, password, role, name, bio, avatarUrl }) {
//         const result = await db.query(
//             'UPDATE users SET username = ?, email = ?, password = ?, role = ?, name = ?, bio = ?, avatarUrl = ? WHERE id = ?',
//             [username, email, password, role, name, bio, avatarUrl, id]
//         );
//         return result.affectedRows > 0;
//     }
// }

// module.exports = Profile;


// const db = require('../utils/db');

// // 个人信息的模型
// class Profile {
//     // 获取个人信息资料
//     static async findById(id) {
//         const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
//         return rows.length > 0 ? rows[0] : null;
//     }

//     // 更新个人信息资料
//     static async updateUserProfile(id, { username, email, password, role, name, bio, avatarUrl }) {
//         try {
//             const [result] = await db.query(
//                 'UPDATE users SET username = ?, email = ?, password = ?, role = ?, name = ?, bio = ?, avatarUrl = ? WHERE id = ?',
//                 [username, email, password, role, name, bio, avatarUrl, id]
//             );
//             console.log('Update result:', result);
//             return result.affectedRows > 0;
//         } catch (error) {
//             console.log('Error executing update query:', error);
//             throw error;
//         }
//     }
// }

// module.exports = Profile;


const db = require('../utils/db');

class Profile {
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }

    static async updateUserProfile(id, { username, email, password, role, name, bio, avatarUrl }) {
        const [result] = await db.query(
            'UPDATE users SET username = ?, email = ?, password = ?, role = ?, name = ?, bio = ?, avatarUrl = ? WHERE id = ?',
            [username, email, password, role, name, bio, avatarUrl, id]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Profile;
