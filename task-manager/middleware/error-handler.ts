import { Request, Response, NextFunction } from 'express'
import { CustomAPIError } from '../errors/custom-error'

function errorHandlerMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  // 如果err 是 CustomAPIError 的子代(繼承了定義在其中的屬性)，回傳自定義 json 格式
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  return res.status(500).json({ msg: 'Something went wrong,please try again' })
}

export default errorHandlerMiddleware
