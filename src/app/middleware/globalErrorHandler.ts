import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMessageType } from '../../interface/IGenericErrorMessageType'
import { handleValidationError } from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { errorlogger } from '../../shared/logger'
import { ZodError } from 'zod'
import { handleZodError } from '../../errors/handleZodError'

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next
) => {
  //
  config.env === 'development'
    ? console.log('Global error handler -->', error)
    : errorlogger.error('Global error handler ', error)

  let statusCode = 500
  let message = 'Something went worng.'
  let errorMessage: IGenericErrorMessageType[] = []

  if (error?.name === 'ValidationError') {
    const simplyfiedError = handleValidationError(error)
    ;(statusCode = simplyfiedError.statusCode),
      (message = simplyfiedError.message),
      (errorMessage = simplyfiedError.errorMessages)

    // ZodError
  } else if (error instanceof ZodError) {
    const simplyfiedError = handleZodError(error)
    ;(statusCode = simplyfiedError.statusCode),
      (message = simplyfiedError.message),
      (errorMessage = simplyfiedError.errorMessages)

    // ApiError
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorMessage = error?.message
      ? [
          {
            path: 'ApiError',
            message: error?.message,
          },
        ]
      : []

    // Error
  } else if (error instanceof Error) {
    message = error?.message
    errorMessage = error?.message
      ? [
          {
            path: 'Error',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    status: false,
    message,
    errorMessage,
    stack: config.env !== 'production' ? error?.stack : message,
  })

  next()
}
