import { BaseMiddleware, Middleware, Params } from '../../../../src'

@Middleware('my-special-path')
export default class PathMiddleware extends BaseMiddleware {
  public async middleware(): Promise<void> {
    this.json({ pathMiddleware: true })
  }
}
