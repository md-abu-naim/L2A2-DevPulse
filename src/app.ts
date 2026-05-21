import express, { type Application, type Request, type Response } from 'express'
import { authRouter } from './modules/auth/auth.router.js'
import { issuesRouter } from './modules/issues/issues.router.js'
const app: Application = express()


app.use(express.json())

app.get('/api/', (req: Request, res: Response) => {
  res.status(200).json({
    "message": "Welcome to DevPulse",
    "author": "Mohammad Abu Naim",
    "Date": '20-05-2026'
  })
})

app.use('/api/auth', authRouter)

app.use('/api/issues', issuesRouter)

export default app