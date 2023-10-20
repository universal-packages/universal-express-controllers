import { ExpressApp } from '../../src'

describe(ExpressApp, (): void => {
  it('Middleware can map request arguments too', async (): Promise<void> => {
    await runExpressApp('./tests/__fixtures__/middleware-arguments')

    await fGet('good', { id: '888' })
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({
      general: { generalMiddleware: true, query: { id: '888' }, options: {} },
      controller: { controllerMiddleware: true, options: { controller: 'yes' }, query: { id: '888' } }
    })
  })
})
