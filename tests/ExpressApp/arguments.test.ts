import fetch from 'node-fetch'
import { ExpressApp } from '../../src'

const port = 4000 + Number(process.env['JEST_WORKER_ID'])

let app: ExpressApp
afterEach(async (): Promise<void> => {
  await app.stop()
})

describe('ExpressApp', (): void => {
  it('Enable action methods to map properties in a fancy decorated way', async (): Promise<void> => {
    app = new ExpressApp({ appLocation: './tests/__fixtures__/arguments', port })
    await app.prepare()
    await app.run()

    app.on('request/error', console.log)

    let response = await fetch(`http://localhost:${port}/good/body`, {
      method: 'post',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ this: 'is a body' })
    })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ body: { this: 'is a body' } })

    response = await fetch(`http://localhost:${port}/good/header`, { headers: { sample: 'this is a sample' } })
    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({ header: 'this is a sample' })

    response = await fetch(`http://localhost:${port}/good/headers`, { headers: { sample: 'this is a sample' } })
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ headers: { sample: 'this is a sample' } })

    response = await fetch(`http://localhost:${port}/good/param/69`)
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ param: '69' })

    response = await fetch(`http://localhost:${port}/good/params/69`)
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ params: { id: '69' } })

    response = await fetch(`http://localhost:${port}/good/response`)
    expect(response.status).toBe(200)
    expect(await response.json()).toContain('_hasBody')

    response = await fetch(`http://localhost:${port}/good/request`)
    expect(response.status).toBe(200)
    expect(await response.json()).toContain('complete')

    response = await fetch(`http://localhost:${port}/good/request-p`)
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ route: { path: '/request-p' } })

    response = await fetch(`http://localhost:${port}/good/query?id=1&order=asc`)
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ query: { id: '1', order: 'asc' } })

    response = await fetch(`http://localhost:${port}/good/query-p?id=1&order=asc`)
    expect(response.status).toBe(200)
    expect(await response.json()).toMatchObject({ id: '1' })
  })
})
