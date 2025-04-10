const db = require('../../utils/db');

class User {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }
}

module.exports = User;
