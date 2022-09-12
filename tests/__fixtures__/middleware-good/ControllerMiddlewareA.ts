import { BaseMiddleware } from '../../../src'

export default class ControllerMiddlewareA extends BaseMiddleware {
  public async middleware(): Promise<void> {
    this.request['context'].push({ controllerMiddlewareA: true, options: this.options })
  }
}
