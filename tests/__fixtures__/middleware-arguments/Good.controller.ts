import { BaseController, Controller, Get } from '../../../src'
import { ControllerUse } from '../../../src/ControllerUse.decorator'
import ControllerMiddleware from './ControllerMiddleware'

@Controller('good')
@ControllerUse(ControllerMiddleware, { controller: 'yes' })
export default class GoodController extends BaseController {
  @Get()
  public async getEnd(): Promise<void> {
    this.response.json(this.request['context'])
  }
}
