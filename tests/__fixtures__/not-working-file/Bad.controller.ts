import { BaseController, Controller, Get } from '../../../src'

@Controller()
export default class BadController extends BaseController {
  @Get()
  public async getEnd(): Promise<void> {
    this.response.json({ works: 'yes' })
  }
}

throw 'Bad file'
