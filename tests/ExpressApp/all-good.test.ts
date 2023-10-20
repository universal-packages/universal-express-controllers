import { ExpressApp } from '../../src'

describe(ExpressApp, (): void => {
  it('Load controllers and builds an express app based on the controllers', async (): Promise<void> => {
    const eventListener = jest.fn()
    await runExpressApp('./tests/__fixtures__/all-good', eventListener)

    await fGet('good')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ get: true })

    await fPost('good/post-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ post: true })

    await fPatch('good/patch-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ patch: true })

    await fPut('good/put-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ put: true })

    await fDelete('good/delete-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ delete: true })

    await fHead('good/head-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')

    await fGet('nonexistent')
    expect(fResponse).toHaveReturnedWithStatus('NOT_FOUND')

    await fGet('excellent')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ get: true })

    await fPost('excellent/post-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ post: true })

    await fPatch('excellent/patch-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ patch: true })

    await fPut('excellent/put-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ put: true })

    await fDelete('excellent/delete-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ delete: true })

    await fHead('excellent/head-end')
    expect(fResponse).toHaveReturnedWithStatus('OK')

    // IF CHANGING EVENTS PRINT THEM USING THIS MF
    // console.log(
    //   JSON.stringify(eventListener.mock.calls, (key, value) => {
    //     if (['request', 'response', 'measurement'].includes(key)) return undefined
    //     return value
    //   })
    // )

    expect(eventListener.mock.calls).toMatchObject([
      [{ event: 'request/start', payload: { request: { method: 'GET' } } }],
      [{ event: 'request/handler', payload: { handler: 'GoodController#getEnd', request: { method: 'GET' } } }],
      [{ event: 'request/end', payload: { handler: 'GoodController#getEnd', request: { method: 'GET' } } }],

      [{ event: 'request/start', payload: { request: { method: 'POST' } } }],
      [{ event: 'request/handler', payload: { handler: 'GoodController#postEnd', request: { method: 'POST' } } }],
      [{ event: 'request/end', payload: { handler: 'GoodController#postEnd', request: { method: 'POST' } } }],

      [{ event: 'request/start', payload: { request: { method: 'PATCH' } } }],
      [{ event: 'request/handler', payload: { handler: 'GoodController#patchEnd', request: { method: 'PATCH' } } }],
      [{ event: 'request/end', payload: { handler: 'GoodController#patchEnd', request: { method: 'PATCH' } } }],

      [{ event: 'request/start', payload: { request: { method: 'PUT' } } }],
      [{ event: 'request/handler', payload: { handler: 'GoodController#putEnd', request: { method: 'PUT' } } }],
      [{ event: 'request/end', payload: { handler: 'GoodController#putEnd', request: { method: 'PUT' } } }],

      [{ event: 'request/start', payload: { request: { method: 'DELETE' } } }],
      [{ event: 'request/handler', payload: { handler: 'GoodController#deleteEnd', request: { method: 'DELETE' } } }],
      [{ event: 'request/end', payload: { handler: 'GoodController#deleteEnd', request: { method: 'DELETE' } } }],

      [{ event: 'request/start', payload: { request: { method: 'HEAD' } } }],
      [{ event: 'request/handler', payload: { handler: 'GoodController#headEnd', request: { method: 'HEAD' } } }],
      [{ event: 'request/end', payload: { handler: 'GoodController#headEnd', request: { method: 'HEAD' } } }],

      [{ event: 'request/start', payload: { request: { method: 'GET' } } }],
      [{ event: 'request/not-found' }],

      [{ event: 'request/start', payload: { request: { method: 'GET' } } }],
      [{ event: 'request/handler', payload: { handler: 'ExcellentController#getEnd', request: { method: 'GET' } } }],
      [{ event: 'request/end', payload: { handler: 'ExcellentController#getEnd', request: { method: 'GET' } } }],

      [{ event: 'request/start', payload: { request: { method: 'POST' } } }],
      [{ event: 'request/handler', payload: { handler: 'ExcellentController#postEnd', request: { method: 'POST' } } }],
      [{ event: 'request/end', payload: { handler: 'ExcellentController#postEnd', request: { method: 'POST' } } }],

      [{ event: 'request/start', payload: { request: { method: 'PATCH' } } }],
      [{ event: 'request/handler', payload: { handler: 'ExcellentController#patchEnd', request: { method: 'PATCH' } } }],
      [{ event: 'request/end', payload: { handler: 'ExcellentController#patchEnd', request: { method: 'PATCH' } } }],

      [{ event: 'request/start', payload: { request: { method: 'PUT' } } }],
      [{ event: 'request/handler', payload: { handler: 'ExcellentController#putEnd', request: { method: 'PUT' } } }],
      [{ event: 'request/end', payload: { handler: 'ExcellentController#putEnd', request: { method: 'PUT' } } }],

      [{ event: 'request/start', payload: { request: { method: 'DELETE' } } }],
      [{ event: 'request/handler', payload: { handler: 'ExcellentController#deleteEnd', request: { method: 'DELETE' } } }],
      [{ event: 'request/end', payload: { handler: 'ExcellentController#deleteEnd', request: { method: 'DELETE' } } }],

      [{ event: 'request/start', payload: { request: { method: 'HEAD' } } }],
      [{ event: 'request/handler', payload: { handler: 'ExcellentController#headEnd', request: { method: 'HEAD' } } }],
      [{ event: 'request/end', payload: { handler: 'ExcellentController#headEnd', request: { method: 'HEAD' } } }]
    ])
  })
})
