import { BaseMiddleware } from '../../../src'

export default class EnderMiddleware extends BaseMiddleware {
  public async middleware(): Promise<void> {
    this.end()
  }
}
