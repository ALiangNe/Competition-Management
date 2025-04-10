const db = require('../../utils/db');

class Competition {
  static async getAllCompetitions() {
    const [rows] = await db.query('SELECT * FROM competitions');
    return rows;
  }

  static async getFilteredCompetitions(title, location, start, end) {
    let query = 'SELECT * FROM competitions WHERE 1=1';
    const params = [];

    if (title) {
      query += ' AND title LIKE ?';
      params.push(`%${title}%`);
    }

    if (location) {
      query += ' AND location LIKE ?';
      params.push(`%${location}%`);
    }

    if (start && end) {
      query += ' AND registrationDeadline BETWEEN ? AND ?';
      params.push(new Date(start), new Date(end));
    }

    const [rows] = await db.query(query, params);
    return rows;
  }

  static async deleteCompetition(id) {
    await db.query('DELETE FROM competitions WHERE id = ?', [id]);
  }

  static async updateCompetition(id, competitionData) {
    await db.query('UPDATE competitions SET ? WHERE id = ?', [competitionData, id]);
  }

  static async addCompetition(competitionData) {
    await db.query('INSERT INTO competitions SET ?', [competitionData]);
  }

}

module.exports = Competition;
