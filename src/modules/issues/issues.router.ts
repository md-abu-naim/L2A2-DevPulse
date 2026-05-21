import { Router } from "express";
import { issuesController } from "./issues.controller.js";


const router = Router() 

router.post('/issues', issuesController.createIssues)

export const issuesRouter = router 