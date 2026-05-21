import { pool } from "../../db/index.js"
import type { Issues } from "./issues.interface.js"


const createIssuesIntoDB = async (payload: Issues) => {
    const { title, description, type, status, reporter_id } = payload

    const result = await pool.query(`
        INSERT INTO issues(title, description, type, reporter_id, status) VALUES($1, $2, $3, $4, COALESCE($5, 'open')) RETURNING *
        `, [title, description, type, reporter_id, status])

    return result.rows[0]
}

const getAllIssuesFromDB = async (query: any) => {
    const { sort = "newest", type, status } = query;


    let sql = `SELECT * FROM issues`
    const values = []
    const conditions = []

    if (type) {
        values.push(type)
        conditions.push(`type = $${values.length}`)
    }

    if (status) {
        values.push(status)
        conditions.push(`status = $${values.length}`)
    }

    if (conditions.length) {
        sql += ` WHERE ${conditions.join(' AND ')}`
    }

    sql += sort === "oldest" ? ` ORDER BY created_at ASC`: ` ORDER BY created_at DESC`

    const issuesResult = await pool.query(sql, values)

    const issues = issuesResult.rows
    console.log('issues', issues);

    const user = await pool.query(`
        SELECT id, name, role FROM users
        `)

    const reporters = user.rows

    const result = issues.map(issue => ({
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,

        reporter: reporters.find(user => user.id === issue.reporter_id),
        
        created_at: issue.created_at,
        updated_at: issue.updated_at
    }))

    return result
}

export const issuesService = {
    createIssuesIntoDB, getAllIssuesFromDB
}