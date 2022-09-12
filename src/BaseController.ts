import { Request, Response } from 'express'

export default class BaseController {
  protected readonly request: Request
  protected readonly response: Response

  public constructor(request: Request, response: Response) {
    this.request = request
    this.response = response
  }
}
