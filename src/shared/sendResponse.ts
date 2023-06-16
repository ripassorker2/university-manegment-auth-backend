import { Response } from 'express'

type IApiReponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  data?: T | null
}

export const sendResonse = <T>(res: Response, data: IApiReponse<T>) => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  }
  res.status(data.statusCode).json(responseData)
}
