import express, { Application } from 'express'
import cors from 'cors'
import { globalErrorHandler } from './app/modules/user/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/user/user.route'

const app: Application = express()

// cors
app.use(cors())

// body perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use router
app.use('/api/v1/users', UserRoutes)

// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('Testing Error logger')
// })

// globalErrorHandler
app.use(globalErrorHandler)

export default app
