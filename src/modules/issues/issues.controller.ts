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


export const issuesController = {
    createIssues
}