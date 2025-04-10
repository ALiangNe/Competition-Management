const db = require('../utils/db');

class Registration {
    // 注册（插入数据）
    static async create(data) {
        const [result] = await db.query('INSERT INTO users SET ?', [data]);
        return result.insertId;
    }

}

module.exports = Registration;
