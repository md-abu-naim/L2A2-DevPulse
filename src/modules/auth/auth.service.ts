import config from "../../config"
import { pool } from "../../db"
import type { IUser } from "./auth.interface"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

const createUserIntoDB = async (payload: IUser) => {
    const { name, email, password, role } = payload

    const hassedPassword = await bcrypt.hash(password as string, 10)

    const result = await pool.query(`
        INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, COALESCE($4, 'contributor')) RETURNING *
        `, [name, email, hassedPassword, role])

    delete result.rows[0].password

    return result
}


const loginUserIntoDB = async (payload: IUser) => {
    const { email, password } = payload

    const userData = await pool.query(`
        SELECT * FROM users WHERE email=$1
        `, [email])

    if (userData.rows.length === 0) {
        throw new Error('Invalid Credentials')
    }

    const user = userData.rows[0]

    const matchedPassword = await bcrypt.compare(password as string, user.password)
    console.log(matchedPassword);

    if (!matchedPassword) {
        throw new Error('Invalid Credentials')
    }

    const jwtPayload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
        updated_at: user.updated_at
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: '1d' })

    return { token: accessToken, user: { ...jwtPayload } }

}

export const authService = {
    createUserIntoDB, loginUserIntoDB
}