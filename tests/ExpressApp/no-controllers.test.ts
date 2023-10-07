import { ExpressApp } from '../../src'

const port = 4000 + Number(process.env['JEST_WORKER_ID'])

let app: ExpressApp
afterEach(async (): Promise<void> => {
  await app.stop()
})

describe(ExpressApp, (): void => {
  it('still works even if there are no registered controllers', async (): Promise<void> => {
    const eventListener = jest.fn()
    app = new ExpressApp({ appLocation: './tests/__fixtures__/no-controllers', port })
    app.on('warning', eventListener)
    await app.prepare()
    await app.run()

    expect(eventListener.mock.calls).toMatchObject([[{ event: 'warning', message: 'No controllers have been found' }]])
  })
})
