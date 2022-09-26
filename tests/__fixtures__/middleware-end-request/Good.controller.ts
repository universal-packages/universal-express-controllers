import { BaseController, Controller, Get } from '../../../src'
import { ActionUse } from '../../../src/ActionUse.decorator'
import { ControllerUse } from '../../../src/ControllerUse.decorator'
import EnderMiddleware from './EnderMiddleware'

@Controller('good')
@ControllerUse(EnderMiddleware)
export default class GoodController extends BaseController {
  @Get()
  public async getEnd(): Promise<void> {
    this.response.status(300)
  }
}
