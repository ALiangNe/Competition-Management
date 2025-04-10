const db = require('../utils/db');

class Score {
  static async create(data) {
    const [result] = await db.query('INSERT INTO scores SET ?', [data]);
    return { id: result.insertId, ...data };
  }
}

module.exports = Score;
