import { ExpressControllers } from '../../src'

describe(ExpressControllers, (): void => {
  it('It catches any action error and fails the request', async (): Promise<void> => {
    const eventListener = jest.fn()
    await runExpressControllers('./tests/__fixtures__/controller-action-error', eventListener)

    await fGet('bad')
    expect(fResponse).toHaveReturnedWithStatus('INTERNAL_SERVER_ERROR')

    expect(eventListener.mock.calls).toMatchObject([
      [{ event: 'request:start', payload: {} }],
      [{ event: 'request:handler', payload: { handler: 'BadController#getEnd' } }],
      [{ event: 'request:error', error: {}, payload: {} }]
    ])
  })
})
