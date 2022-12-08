import { BaseController, Controller, Get } from '../../../src'
import { ActionUse } from '../../../src/ActionUse.decorator'
import { ControllerUse } from '../../../src/ControllerUse.decorator'
import ActionMiddlewareA from './ActionMiddlewareA'
import ActionMiddlewareB from './ActionMiddlewareB'
import ControllerMiddlewareA from './ControllerMiddlewareA'
import ControllerMiddlewareB from './ControllerMiddlewareB'

@Controller('good')
@ControllerUse(ControllerMiddlewareA, { middle: 'c-a' })
@ControllerUse(ControllerMiddlewareB, { middle: 'c-b' })
export default class GoodController extends BaseController {
  @Get(':id')
  @ActionUse(ActionMiddlewareA, { middle: 'a-a' })
  @ActionUse(ActionMiddlewareB, { middle: 'a-b' })
  public async getEnd(): Promise<void> {
    this.response.json(this.request['context'])
  }
}
