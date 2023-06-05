import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { errorlogger, logger } from './shared/logger'

async function connection() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('DB is connected succesfully ....!!')

    app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error(err)
  }
}
connection()
