import { ExpressApp } from '../../src'

describe(ExpressApp, (): void => {
  it('Enable action methods to map properties in a fancy decorated way', async (): Promise<void> => {
    await runExpressApp('./tests/__fixtures__/arguments')

    await fPost('good/10/body', { this: 'is a body' })
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ body: { this: 'is a body' } })

    fHeaders({ sample: 'this is a sample' })
    await fGet('good/10/header')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ header: 'this is a sample' })

    fHeaders({ sample: 'this is a sample' })
    await fGet('good/10/headers')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toMatchObject({ headers: { sample: 'this is a sample' } })

    await fGet('good/10/param/69')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ param: '69', controllerParam: '10' })

    await fGet('good/10/params/69')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ params: { id: '69', cp: '10' } })

    await fGet('good/10/response')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toContain('_hasBody')

    await fGet('good/10/request')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toContain('complete')

    await fGet('good/10/request-p')
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toMatchObject({ route: { path: '/good/:cp/request-p' } })

    await fGet('good/10/query', { id: '1', order: 'asc' })
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ query: { id: '1', order: 'asc' } })

    await fGet('good/10/query-p', { id: '1', order: 'asc' })
    expect(fResponse).toHaveReturnedWithStatus('OK')
    expect(fResponseBody).toEqual({ id: '1' })
  })
})
