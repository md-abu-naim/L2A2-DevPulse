import type { Request, Response } from "express";
import { authService } from "./auth.service.js";
import sendResponse from "../../utility/sendResponse.js";


const createUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.createUserIntoDB(req.body)

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'User registered successfully',
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const result = await authService.loginUserIntoDB(req.body)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Login successfully',
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            statusCode: 500,
            success: false,
            message: error.message,
            error: error
        })
    }
}


export const authController = {
    createUser, loginUser
}