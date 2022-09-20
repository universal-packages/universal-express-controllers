import { BaseMiddleware } from '../../../src'

export default class ActionMiddlewareB extends BaseMiddleware {
  public async middleware(): Promise<void> {
    this.request['context'].push({ actionMiddlewareB: true, options: this.options })
  }
}
