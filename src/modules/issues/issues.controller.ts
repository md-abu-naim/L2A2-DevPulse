import type { Request, Response } from "express"
import { issuesService } from "./issues.service.js";


const createIssues = async (req: Request, res: Response) => {
    try {
        const reporter_id = (req as any).user.id

        const result = await issuesService.createIssuesIntoDB({ ...req.body, reporter_id })

        res.status(201).json({
            success: true,
            message: 'Issue created successfully',
            data: result
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


const getAllIssues = async (req: Request, res: Response) => {
    try {

        const result = await issuesService.getAllIssuesFromDB(req.query)

        res.status(200).json({
            success: true,
            message: 'Retrieve all issues successfully',
            data: result
        })

    } catch (error: any) {
        res.status(500).json({
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


        res.status(200).json({
            success: true,
            message: 'Retrieve a issue successfully',
            data: result
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


const updateIssues = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const result = await issuesService.updateIssueIntoDB(req.body, id as string)

        res.status(200).json({
            success: true,
            message: 'Issue updated successfully',
            data: result
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            error: error
        })
    }
}


export const issuesController = {
    createIssues, getAllIssues, getSingleIssue,
    updateIssues
}