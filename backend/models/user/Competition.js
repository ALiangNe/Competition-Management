const db = require('../../utils/db');

class Competition {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM competitions');
    return rows;
  }
}

module.exports = Competition;
