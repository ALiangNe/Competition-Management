
const db = require('../utils/db');

class Login {
    // 查找注册数据（登录）
    static async findByUsernameAndRole(username, role) {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ? AND role = ?', [username, role]);
        return rows.length > 0 ? rows[0] : null;
    }

    // 添加导航项“个人信息”，获取个人信息数据
    static async findById(id) {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = Login;
