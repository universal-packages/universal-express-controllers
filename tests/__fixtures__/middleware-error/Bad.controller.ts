import { BaseController, Controller, Get } from '../../../src'

@Controller('bad')
export default class BadController extends BaseController {
  @Get()
  public async getEnd(): Promise<void> {}
}
