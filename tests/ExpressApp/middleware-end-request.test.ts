import { ExpressApp } from '../../src'

describe(ExpressApp, (): void => {
  it('it ends the next change and emits the request ending', async (): Promise<void> => {
    const eventListener = jest.fn()
    await runExpressApp('./tests/__fixtures__/middleware-end-request', eventListener)

    await fGet('good')
    expect(fResponse).toHaveReturnedWithStatus('OK')

    expect(eventListener.mock.calls).toMatchObject([
      [{ event: 'request/start' }],
      [{ event: 'request/middleware', payload: { name: 'EnderMiddleware' } }],
      [{ event: 'request/end', payload: { handler: 'EnderMiddleware' } }]
    ])
  })
})
