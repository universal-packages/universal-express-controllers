import { NextFunction, Request, Response } from 'express'

export default async function good(request: Request, response: Response, next: NextFunction): Promise<void> {
  const context = request['context'] || []
  context.push({ goodMiddleware: true })
  request['context'] = context
  next()
}
