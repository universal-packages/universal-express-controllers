import { BaseMiddleware, MiddlewareOptions, Query } from '../../../src'
import { Middleware } from '../../../src/Middleware.decorator'

@Middleware()
export default class ControllerMiddleware extends BaseMiddleware {
  public async middleware(@Query() query: any, @MiddlewareOptions() options: any): Promise<void> {
    this.request['context'] = { controllerMiddleware: true, query, options }
  }
}
