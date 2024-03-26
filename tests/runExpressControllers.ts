import { ExpressControllers } from '../src'

let currentApp: ExpressControllers

declare global {
  function runExpressControllers(appLocation?: string, eventListener?: any, debugError?: boolean): Promise<ExpressControllers>
}

global.runExpressControllers = async function setAppLocation(appLocation: string = './tests/__fixtures__', eventListener?: any, debugError?: boolean): Promise<ExpressControllers> {
  currentApp = new ExpressControllers({ appLocation, port: fDefaultPort })

  if (eventListener) currentApp.on('*:*', eventListener)
  if (eventListener) currentApp.on('*', eventListener)
  if (debugError) currentApp.on('request:error', console.log)

  await currentApp.prepare()
  await currentApp.run()

  return currentApp
}

afterEach(async (): Promise<void> => {
  if (currentApp) currentApp.stop()

  currentApp = undefined
})
