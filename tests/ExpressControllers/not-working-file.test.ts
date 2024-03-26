import { ExpressControllers } from '../../src'

describe(ExpressControllers, (): void => {
  it('Throws if a class has actions but not decorated with controller decorator', async (): Promise<void> => {
    let error: Error
    const app = new ExpressControllers({ appLocation: './tests/__fixtures__/not-working-file' })

    try {
      await app.prepare()
    } catch (err) {
      error = err
    }

    expect(error.message).toEqual('Bad file')
  })
})
