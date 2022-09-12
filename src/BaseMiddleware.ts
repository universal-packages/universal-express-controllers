import { Request, Response } from 'express'

export default class BaseMiddleware<O = any> {
  protected readonly request: Request
  protected readonly response: Response
  protected readonly options: O

  public constructor(request: Request, response: Response, options: O) {
    this.request = request
    this.response = response
    this.options = options
  }

  public async middleware(..._args: any[]): Promise<void> {
    throw new Error('Middlewares should implement the "middleware" method')
  }
}
