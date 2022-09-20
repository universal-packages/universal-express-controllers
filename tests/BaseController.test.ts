import { BaseController } from '../src'

class TestController extends BaseController {
  public async all(): Promise<void> {
    this.cookie('some', 'yes').clearCookie('some')
    await this.download('./somefile')
    this.end()
    this.format({})
    this.json({ object: true })
    this.jsonp({ object: true })
    this.redirect('/yes')
    this.render('/view', { local: true })
    this.send('text')
    this.sendStatus('BAD_GATEWAY')
    this.set('header', 'yes')
    this.status('ACCEPTED')
  }
}

describe('BaseController', (): void => {
  it('Calls functions', async (): Promise<void> => {
    const response = {
      clearCookie: jest.fn(),
      cookie: jest.fn(),
      download: jest.fn().mockImplementation((_: string, callback: () => void) => {
        callback()
      }),
      end: jest.fn(),
      format: jest.fn(),
      json: jest.fn(),
      jsonp: jest.fn(),
      redirect: jest.fn(),
      render: jest.fn(),
      send: jest.fn(),
      sendStatus: jest.fn(),
      set: jest.fn(),
      status: jest.fn()
    }
    const controller = new TestController({} as any, response as any)

    await controller.all()

    expect(response.clearCookie).toHaveBeenCalledWith('some', undefined)
    expect(response.cookie).toHaveBeenCalledWith('some', 'yes', undefined)
    expect(response.end).toHaveBeenCalled()
    expect(response.format).toHaveBeenCalledWith({})
    expect(response.json).toHaveBeenCalledWith({ object: true })
    expect(response.jsonp).toHaveBeenCalledWith({ object: true })
    expect(response.redirect).toHaveBeenCalledWith('/yes')
    expect(response.render).toHaveBeenCalledWith('/view', { local: true })
    expect(response.send).toHaveBeenCalledWith('text')
    expect(response.sendStatus).toHaveBeenCalledWith(502)
    expect(response.set).toHaveBeenCalledWith('header', 'yes')
    expect(response.status).toHaveBeenCalledWith(202)
  })
})
