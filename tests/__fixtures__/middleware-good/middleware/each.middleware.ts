import { BaseMiddleware, Middleware, MiddlewareStrategy, Params } from '../../../../src'

@Middleware()
export default class EachMiddleware extends BaseMiddleware {
  public static readonly strategy: MiddlewareStrategy = 'each'

  public async middleware(@Params() params: any): Promise<void> {
    this.request['context'].push({ eachMiddleware: true, params })
  }
}
