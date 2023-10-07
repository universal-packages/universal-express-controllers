import fetch from 'node-fetch'

import { ExpressApp } from '../../src'

const port = 4000 + Number(process.env['JEST_WORKER_ID'])

let app: ExpressApp
afterEach(async (): Promise<void> => {
  await app.stop()
})

describe(ExpressApp, (): void => {
  it('It catches any middleware error and fails the request', async (): Promise<void> => {
    const eventListener = jest.fn()
    app = new ExpressApp({ appLocation: './tests/__fixtures__/middleware-error', port })
    await app.prepare()
    await app.run()

    app.on('request/start', eventListener)
    app.on('request/end', eventListener)
    app.on('request/middleware', eventListener)
    app.on('request/error', eventListener)

    let response = await fetch(`http://localhost:${port}/bad`)
    expect(response.status).toBe(500)

    expect(eventListener.mock.calls).toMatchObject([
      [{ event: 'request/start' }],
      [{ event: 'request/middleware', payload: { name: 'bad' } }],
      [{ event: 'request/error', error: new Error('Bad middleware') }]
    ])
  })
})
