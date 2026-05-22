import { Router } from "express";
import { issuesController } from "./issues.controller.js";
import auth from "../../middleware/auth.js";


const router = Router()

router.post('/', auth, issuesController.createIssues)

// /api/issues?sort=oldest&type=bug&status=in_progress
router.get('/', issuesController.getAllIssues)

router.get('/:id', issuesController.getSingleIssue)

router.put('/:id', auth, issuesController.updateIssues)

router.delete('/:id', auth, issuesController.deleteIssue)

export const issuesRouter = router 