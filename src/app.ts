import express, { Application } from 'express'
import cors from 'cors'
import { globalErrorHandler } from './app/middleware/globalErrorHandler'
import routes from './app/routes'

const app: Application = express()

// cors
app.use(cors())

// body perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use routes
app.use('/api/v1', routes)

// globalErrorHandler
app.use(globalErrorHandler)

export default app
