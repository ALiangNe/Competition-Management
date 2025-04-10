

const db = require('../../utils/db');

class Application {
    static async create(data) {
        const { users_id, competitions_id, state, state_description } = data;
        const [result] = await db.query(
            'INSERT INTO application (users_id, competitions_id, state, state_description) VALUES (?, ?, ?, ?)',
            [users_id, competitions_id, state, state_description]
        );
        return result.insertId;
    }

    static async findByUser(userId) {
        const [rows] = await db.query(
            'SELECT * FROM application WHERE users_id = ?',
            [userId]
        );
        return rows;
    }

    static async findRegisteredCompetitionsByUser(userId) {
        const [rows] = await db.query(
            `SELECT c.*, a.state_description FROM application a
            JOIN competitions c ON a.competitions_id = c.id
            WHERE a.users_id = ?`,
            [userId]
        );
        return rows;
    }

    static async findApprovedCompetitionsByUserId(userId) {
        const [rows] = await db.query(`
        SELECT c.*, a.state_description 
        FROM application a 
        JOIN competitions c ON a.competitions_id = c.id 
        WHERE a.users_id = ? AND a.state = 2`, [userId]);
        return rows;
    }

}

module.exports = Application;
