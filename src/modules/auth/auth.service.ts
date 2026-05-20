import { pool } from "../../db"
import type { IUser } from "./auth.interface"
import bcrypt from "bcryptjs"

const createUserIntoDB = async(payload: IUser) => {
    const {name, email, password, role} = payload

    const hassedPassword = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`
        INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *
        `, [name, email, hassedPassword, role])

    delete result.rows[0].password

    return result
}

export const authService = {
    createUserIntoDB
}