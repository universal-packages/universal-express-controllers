import { NextFunction, Request, Response } from 'express'

export default async function excellent(request: Request, response: Response, next: NextFunction): Promise<void> {
  const context = request['context'] || []
  context.push({ excellentMiddleware: true })
  request['context'] = context
  next()
}
