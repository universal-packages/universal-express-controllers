import { BaseMiddleware } from '../../../src'

export default class AcctionMiddlewareB extends BaseMiddleware {
  public async middleware(): Promise<void> {
    this.request['context'].push({ acctionMiddlewareB: true, options: this.options })
  }
}
