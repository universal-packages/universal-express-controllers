import { BaseMiddleware, Middleware, Params } from '../../../../src'

@Middleware({ strategy: 'each' })
export default class EachMiddleware extends BaseMiddleware {
  public async middleware(@Params() params: any): Promise<void> {
    this.request['context'].push({ eachMiddleware: true, params })
  }
}
