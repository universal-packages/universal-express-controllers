import { ExpressApp } from '../../src'

describe(ExpressApp, (): void => {
  it('It catches any middleware error and fails the request', async (): Promise<void> => {
    const eventListener = jest.fn()
    await runExpressApp('./tests/__fixtures__/middleware-error', eventListener)

    await fGet('bad')
    expect(fResponse).toHaveReturnedWithStatus('INTERNAL_SERVER_ERROR')

    expect(eventListener.mock.calls).toMatchObject([
      [{ event: 'request/start' }],
      [{ event: 'request/middleware', payload: { name: 'bad' } }],
      [{ event: 'request/error', error: new Error('Bad middleware') }]
    ])
  })
})
