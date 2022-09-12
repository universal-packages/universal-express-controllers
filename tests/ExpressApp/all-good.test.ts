import fetch from 'node-fetch'
import { ExpressApp } from '../../src'

const port = 4000 + Number(process.env['JEST_WORKER_ID'])

let app: ExpressApp
afterEach(async (): Promise<void> => {
  await app.stop()
})

describe('ExpressApp', (): void => {
  it('Load controllers and builds an express app based on the controllers', async (): Promise<void> => {
    const eventListener = jest.fn()
    app = new ExpressApp({ appLocation: './tests/__fixtures__/all-good', port })
    await app.prepare()
    await app.run()

    app.on('request/start', eventListener)
    app.on('request/end', eventListener)
    app.on('request/not-found', eventListener)

    let response = await fetch(`http://localhost:${port}/good`)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ get: true })

    response = await fetch(`http://localhost:${port}/good/post-end`, { method: 'post' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ post: true })

    response = await fetch(`http://localhost:${port}/good/patch-end`, { method: 'patch' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ patch: true })

    response = await fetch(`http://localhost:${port}/good/put-end`, { method: 'put' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ put: true })

    response = await fetch(`http://localhost:${port}/good/delete-end`, { method: 'delete' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ delete: true })

    response = await fetch(`http://localhost:${port}/good/head-end`, { method: 'head' })
    expect(response.status).toBe(200)

    response = await fetch(`http://localhost:${port}/nonexistent`)
    expect(response.status).toBe(404)

    response = await fetch(`http://localhost:${port}/excelent`)
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ get: true })

    response = await fetch(`http://localhost:${port}/excelent/post-end`, { method: 'post' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ post: true })

    response = await fetch(`http://localhost:${port}/excelent/patch-end`, { method: 'patch' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ patch: true })

    response = await fetch(`http://localhost:${port}/excelent/put-end`, { method: 'put' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ put: true })

    response = await fetch(`http://localhost:${port}/excelent/delete-end`, { method: 'delete' })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ delete: true })

    response = await fetch(`http://localhost:${port}/excelent/head-end`, { method: 'head' })
    expect(response.status).toBe(200)

    expect(eventListener.mock.calls).toMatchObject([
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'GoodController#getEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'GoodController#postEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'GoodController#patchEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'GoodController#putEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'GoodController#deleteEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'GoodController#headEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/not-found' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'ExcelentController#getEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'ExcelentController#postEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'ExcelentController#patchEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'ExcelentController#putEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'ExcelentController#deleteEnd' }],
      [{ event: 'request/start' }],
      [{ event: 'request/end', handler: 'ExcelentController#headEnd' }]
    ])
  })
})
