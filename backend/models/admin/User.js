const db = require('../../utils/db');

class User {
    // --Admin端
    static async getAllUsers() {
        const [rows] = await db.query('SELECT id, username, email, password, role, name, bio, avatarUrl, createdAt, updatedAt FROM users');
        return rows;
    }

    static async createUser(data) {
        const [result] = await db.query('INSERT INTO users SET ?', [data]);
        return result.insertId;
    }

    static async updateUser(id, data) {
        const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [data, id]);
        return result;
    }

    static async deleteUser(id) {
        const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
        return result;
    }

}

module.exports = User;