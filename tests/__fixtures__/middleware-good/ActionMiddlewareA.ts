import { BaseMiddleware } from '../../../src'

export default class AcctionMiddlewareA extends BaseMiddleware {
  public async middleware(): Promise<void> {
    this.request['context'].push({ acctionMiddlewareA: true, options: this.options })
  }
}
