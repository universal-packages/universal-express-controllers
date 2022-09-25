import { BaseController, Controller, Get } from '../../../src'

@Controller()
export class BadController extends BaseController {
  @Get()
  public async getEnd(): Promise<void> {
    this.response.json({ works: 'yes' })
  }
}
