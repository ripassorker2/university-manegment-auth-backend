import express, { Application, Request, Response } from 'express'
import cors from 'cors'

import userRouter from './app/modules/user/users.route'

const app: Application = express()

// cors
app.use(cors())

// body perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use router
app.use('/api/v1/users', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Server is running')
})

export default app
