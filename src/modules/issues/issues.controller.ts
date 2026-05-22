import type { Request, Response } from "express"
import { issuesService } from "./issues.service.js";
import sendResponse from "../../utility/sendResponse.js";


const createIssues = async (req: Request, res: Response) => {
    try {
        const reporter_id = (req as any).user.id

        const result = await issuesService.createIssuesIntoDB({ ...req.body, reporter_id })

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: 'Issue created successfully',
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


const getAllIssues = async (req: Request, res: Response) => {
    try {

        const result = await issuesService.getAllIssuesFromDB(req.query)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Retrieve all issues successfully',
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


const getSingleIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await issuesService.getSingleIssueFromDB(id as string)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Retrieve a issue successfully',
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


const updateIssues = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const user = req.user!

        const result = await issuesService.updateIssueIntoDB(req.body, id as string, user)

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Issue updated successfully',
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

const deleteIssue = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const user = req.user!

        const result = await issuesService.deleteIssueFromDB(id as string, user)

        res.status(200).json({
            success: true,
            message: 'Issue deleted successfully',
            data: result
        })

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Issue deleted successfully',
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


export const issuesController = {
    createIssues, getAllIssues, getSingleIssue,
    updateIssues, deleteIssue
}