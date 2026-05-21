import { pool } from "../../db/index.js"


const createIssuesIntoDB = async (payload: any) => {
    const { title, description, type, status, reporter_id } = payload

    const result = await pool.query(`
        INSERT INTO issues(title, description, type, reporter_id, status) VALUES($1, $2, $3, $4, COALESCE($5, 'open')) RETURNING *
        `, [title, description, type, reporter_id, status])

    return result.rows[0]
}

export const issuesService = {
    createIssuesIntoDB
}