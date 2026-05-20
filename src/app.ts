import express, { type Request, type Response } from 'express'
const app = express()

app.get('/api/', (req: Request, res: Response) => {
  res.status(200).json({
    "message": "Welcome to DevPulse",
    "author": "Mohammad Abu Naim",
    "Date": '20-05-2026'
  })
})

export default app