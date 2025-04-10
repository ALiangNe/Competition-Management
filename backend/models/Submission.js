const db = require('../utils/db');

class Submission {
    // 用户上传作品
    static async create(data) {
        const [result] = await db.query('INSERT INTO submissions SET ?', [data]);
        return result.insertId;
    }

    // 管理员获取作品列表
    static async getSubmissionList() {
        const query = `
            SELECT 
                users.username, 
                users.email, 
                competitions.title, 
                competitions.description AS competition_description, 
                submissions.created_at, 
                submissions.file_path, 
                submissions.description AS submission_description 
            FROM 
                submissions
            JOIN 
                users ON submissions.user_id = users.id
            JOIN 
                competitions ON submissions.competition_id = competitions.id
        `;
        const [results] = await db.query(query);
        return results;
    }
}

module.exports = Submission;
