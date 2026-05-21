import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config/index.js";
import { pool } from "../db/index.js";

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization

        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized access!!",
            })
        }

        const decoded = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload


        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        })
    }
}

export default auth