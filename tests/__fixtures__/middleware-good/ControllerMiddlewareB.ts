import { BaseMiddleware } from '../../../src'

export default class ControllerMiddlewareB extends BaseMiddleware {
  public async middleware(): Promise<void> {
    this.request['context'].push({ controllerMiddlewareB: true, options: this.options })
  }
}
