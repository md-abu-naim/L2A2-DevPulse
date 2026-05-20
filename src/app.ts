import express, { type Request, type Response } from 'express'
const app = express()

app.get('/', (req:Request, res: Response) => {
  res.status(200).json({
    "message": "Welcome to DevPulse",
    "author": "Mohammad Abu Naim"
  })
})

export default app