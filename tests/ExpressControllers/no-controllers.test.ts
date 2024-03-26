import { ExpressControllers } from '../../src'

describe(ExpressControllers, (): void => {
  it('still works even if there are no registered controllers', async (): Promise<void> => {
    const eventListener = jest.fn()
    await runExpressControllers('./tests/__fixtures__/no-controllers', eventListener)

    expect(eventListener.mock.calls).toMatchObject([[{ event: 'warning', message: 'No controllers have been found' }]])
  })
})
