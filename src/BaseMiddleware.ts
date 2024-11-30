import { Request, Response } from 'express'

import BaseController from './BaseController'

export default class BaseMiddleware<O = any> extends BaseController {
  protected readonly options: O

  public constructor(request: Request, response: Response, options: O) {
    super(request, response)
    this.options = options
  }

  public async middleware(..._args: any[]): Promise<void> {
    throw new Error('Middleware should implement the "middleware" method')
  }
}
