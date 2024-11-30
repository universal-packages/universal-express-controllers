import { ExpressControllers } from '../../src'

describe(ExpressControllers, (): void => {
  it('executes configured middleware all across controllers', async (): Promise<void> => {
    const eventListener = jest.fn()
    await runExpressControllers('./tests/__fixtures__/middleware-good', eventListener)

    await fGet('good/69')

    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual([
      { excellentMiddleware: true },
      { goodMiddleware: true },
      { controllerMiddlewareB: true, options: { middle: 'c-b' } },
      { controllerMiddlewareA: true, options: { middle: 'c-a' } },
      { eachMiddleware: true, params: { id: '69' } },
      { actionMiddlewareB: true, options: { middle: 'a-b' } },
      { actionMiddlewareA: true, options: { middle: 'a-a' } }
    ])

    expect(eventListener.mock.calls).toMatchObject([
      [{ event: 'request:start', payload: {} }],
      [{ event: 'request:middleware', payload: { name: 'excellent' } }],
      [{ event: 'request:middleware', payload: { name: 'good' } }],
      [{ event: 'request:middleware', payload: { name: 'ControllerMiddlewareB' } }],
      [{ event: 'request:middleware', payload: { name: 'ControllerMiddlewareA' } }],
      [{ event: 'request:middleware', payload: { name: 'EachMiddleware' } }],
      [{ event: 'request:middleware', payload: { name: 'ActionMiddlewareB' } }],
      [{ event: 'request:middleware', payload: { name: 'ActionMiddlewareA' } }],
      [{ event: 'request:handler', payload: { handler: 'GoodController#getEnd' } }],
      [{ event: 'request:end', payload: { handler: 'GoodController#getEnd' } }]
    ])
  })

  it('executes middleware with path', async (): Promise<void> => {
    const eventListener = jest.fn()
    await runExpressControllers('./tests/__fixtures__/middleware-good', eventListener)

    await fGet('my-special-path')

    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ pathMiddleware: true })

    expect(eventListener.mock.calls).toMatchObject([
      [{ event: 'request:start', payload: expect.anything() }],
      [{ event: 'request:middleware', payload: { name: 'excellent' } }],
      [{ event: 'request:middleware', payload: { name: 'good' } }],
      [{ event: 'request:middleware', payload: { name: 'PathMiddleware' } }],
      [{ event: 'request:end', payload: { handler: 'PathMiddleware' } }]
    ])
  })
})
