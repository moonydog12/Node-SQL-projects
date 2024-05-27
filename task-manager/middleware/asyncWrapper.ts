import { Request, Response, NextFunction } from 'express'

function asyncWrapper(fn: Function) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export default asyncWrapper
