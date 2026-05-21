import { Router } from "express";
import { issuesController } from "./issues.controller.js";
import auth from "../../middleware/auth.js";


const router = Router() 

router.post('/issues', auth, issuesController.createIssues)

// /api/issues?sort=oldest&type=feature_request&status=in_progress
router.get('/issues', auth, issuesController.getAllIssues)

export const issuesRouter = router 