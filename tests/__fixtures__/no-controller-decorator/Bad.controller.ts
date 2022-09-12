import { BaseController, Get } from '../../../src'

export default class BadController extends BaseController {
  @Get()
  public async getEnd(): Promise<void> {
    this.response.json({ works: 'yes' })
  }
}
