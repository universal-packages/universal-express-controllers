import { BaseController, Controller, Get } from '../../../src'
import { ActionUse } from '../../../src/ActionUse.decorator'
import { ControllerUse } from '../../../src/ControllerUse.decorator'
import AcctionMiddlewareA from './ActionMiddlewareA'
import AcctionMiddlewareB from './ActionMiddlewareB'
import ControllerMiddlewareA from './ControllerMiddlewareA'
import ControllerMiddlewareB from './ControllerMiddlewareB'

@Controller('good')
@ControllerUse(ControllerMiddlewareA, { middle: 'c-a' })
@ControllerUse(ControllerMiddlewareB, { middle: 'c-b' })
export default class GoodController extends BaseController {
  @Get()
  @ActionUse(AcctionMiddlewareA, { middle: 'a-a' })
  @ActionUse(AcctionMiddlewareB, { middle: 'a-b' })
  public async getEnd(): Promise<void> {
    this.response.json(this.request['context'])
  }
}
