import { pool } from "../../db/index.js"


const createIssuesIntoDB = async(payload: any) => {
    const {title, description, type, status} = payload

    const result = await pool.query(`
        INSERT INTO issues(title, description, type, status) VALUES($1, $2, $3, COALESCE($4, 'open')) RETURNING *
        `, [title, description, type, status])

    return result.rows[0]
}

export const issuesService = {
    createIssuesIntoDB
}