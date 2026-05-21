import { Router } from "express";
import { issuesController } from "./issues.controller.js";
import auth from "../../middleware/auth.js";


const router = Router() 

router.post('/issues', auth, issuesController.createIssues)

export const issuesRouter = router 