import { ExpressApp } from '../../src'

describe('ExpressApp', (): void => {
  it('Throws if a class has actions but not decorated with controller decorator', async (): Promise<void> => {
    let error: Error
    const app = new ExpressApp({ appLocation: './tests/__fixtures__/double-registry-class' })

    try {
      await app.prepare()
    } catch (err) {
      error = err
    }

    expect(error.message).toMatch(
      /Class BadController class has been registered with multiple @Controller and\/or @Middleware what\?\n.*__fixtures__\/double-registry-class\/Bad.controller.ts/
    )
  })
})
