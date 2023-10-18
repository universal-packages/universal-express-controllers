import { ExpressApp } from '../../src'

const port = 4000 + Number(process.env['JEST_WORKER_ID'])

let app: ExpressApp
afterEach(async (): Promise<void> => {
  await app.stop()
})

describe(ExpressApp, (): void => {
  it('Middleware can map request arguments too', async (): Promise<void> => {
    app = new ExpressApp({ appLocation: './tests/__fixtures__/middleware-arguments', port })
    await app.prepare()
    await app.run()

    await fGet('good', { id: '888' })
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({
      general: { generalMiddleware: true, query: { id: '888' }, options: {} },
      controller: { controllerMiddleware: true, options: { controller: 'yes' }, query: { id: '888' } }
    })
  })
})
