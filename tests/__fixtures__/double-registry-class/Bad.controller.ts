import { BaseController, Controller, Get } from '../../../src'
import { Middleware } from '../../../src/Middleware.decorator'

@Controller()
@Middleware()
export default class BadController extends BaseController {
  @Get()
  public async getEnd(): Promise<void> {
    this.response.json({ works: 'yes' })
  }
}
