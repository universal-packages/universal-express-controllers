import { NextFunction, Request, Response } from 'express'

export default async function excelent(request: Request, response: Response, next: NextFunction): Promise<void> {
  const context = request['context'] || []
  context.push({ excelentMiddleware: true })
  request['context'] = context
  next()
}
