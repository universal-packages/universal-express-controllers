import { NextFunction, Request, Response } from 'express'

export default async function bad(request: Request, response: Response, next: NextFunction): Promise<void> {
  throw new Error('Bad middleware')
}
