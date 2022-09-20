import { BaseMiddleware } from '../../../src'

export default class ActionMiddlewareA extends BaseMiddleware {
  public async middleware(): Promise<void> {
    this.request['context'].push({ actionMiddlewareA: true, options: this.options })
  }
}
