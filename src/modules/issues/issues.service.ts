import type { JwtPayload } from "jsonwebtoken"
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

    sql += sort === "oldest" ? ` ORDER BY created_at ASC` : ` ORDER BY created_at DESC`

    const issuesResult = await pool.query(sql, values)

    const issues = issuesResult.rows

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

    if (result.length === 0) {
        throw new Error('Issues not found')
    }

    return result
}

const getSingleIssueFromDB = async (id: string) => {
    const issueResult = await pool.query(`
        SELECT * FROM issues WHERE id=$1
        `, [id])

    if (issueResult.rows.length === 0) {
        throw new Error('Issue not found')
    }

    const issue = issueResult.rows[0]

    const user = await pool.query(`
        SELECT id, name, role FROM users
        `)

    const reporters = user.rows

    const result = {
        id: issue.id,
        title: issue.title,
        description: issue.description,
        type: issue.type,
        status: issue.status,

        reporter: reporters.find(user => user.id === issue.reporter_id),

        created_at: issue.created_at,
        updated_at: issue.updated_at
    }

    return result
}

const updateIssueIntoDB = async (payload: Issues, id: string, user: JwtPayload) => {
    const { title, description, type, status } = payload

    const issueResult = await pool.query(
        `SELECT * FROM issues WHERE id = $1`,
        [id]
    )

    const issue = issueResult.rows[0]

    if (!issue) throw new Error("Issue not found")

    if (user.role !== 'maintainer' && !(String(issue.reporter_id) === String(user.id) && issue.status === 'open')) {
        throw new Error("Forbidden access")
    }

    const result = await pool.query(
        `UPDATE issues SET 
        title=COALESCE($1, title),
        description=COALESCE($2, description),
        type=COALESCE($3, type),
        status=COALESCE($4, status)

        WHERE id=$5 RETURNING * `,
        [title, description, type, status, id])

    return result.rows[0]
}

const deleteIssueFromDB = async (id: string, user: JwtPayload) => {
    if (user?.role !== 'maintainer') {
        throw new Error('Only maintainer can delete issues')
    }

    const result = await pool.query(`
        DELETE FROM issues WHERE id=$1
        `, [id])

    return result.rows[0]
}

export const issuesService = {
    createIssuesIntoDB, getAllIssuesFromDB,
    getSingleIssueFromDB, updateIssueIntoDB,
    deleteIssueFromDB
}