import { ExpressApp } from '../../src'

describe('ExpressApp', (): void => {
  it('Throws if a class has actions but not decorated with controller decorator', async (): Promise<void> => {
    let error: Error
    const app = new ExpressApp({ appLocation: './tests/__fixtures__/no-controller-decorator' })

    try {
      await app.prepare()
    } catch (err) {
      error = err
    }

    expect(error.message).toMatch(
      /Class BadController make use of decorators but hasn't been registered with @Controller or @Middleware\n.*__fixtures__\/no-controller-decorator\/Bad.controller.ts/
    )
  })
})
