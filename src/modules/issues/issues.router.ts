import { Router } from "express";
import { issuesController } from "./issues.controller.js";
import auth from "../../middleware/auth.js";


const router = Router() 

router.post('/', auth, issuesController.createIssues)

// /api/issues?sort=oldest&type=feature_request&status=in_progress
router.get('/', auth, issuesController.getAllIssues)

router.get('/:id', auth, issuesController.getSingleIssue)

export const issuesRouter = router 