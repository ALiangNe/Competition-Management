const db = require('../../utils/db');

class Application {

    static async findAll() {
        const [rows] = await db.query(
          `SELECT a.id, u.username, u.email, u.avatarUrl, c.title, a.state_description 
           FROM application a
           JOIN users u ON a.users_id = u.id
           JOIN competitions c ON a.competitions_id = c.id`
        );
        // console.log('Fetched applications:', rows); // Add this line to log fetched applications
        return rows;
      }
    
    static async updateStatus(id, state, state_description) {
        console.log(`Executing SQL: UPDATE application SET state = ${state}, state_description = '${state_description}' WHERE id = ${id}`);
        await db.query(
            'UPDATE application SET state = ?, state_description = ? WHERE id = ?',
            [state, state_description, id]
        );
        // console.log(`SQL execution complete for application ID ${id}`);
    }

}

module.exports = Application;
