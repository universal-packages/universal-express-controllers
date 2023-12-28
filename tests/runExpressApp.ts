import { ExpressApp } from '../src'

let currentApp: ExpressApp

declare global {
  function runExpressApp(appLocation?: string, eventListener?: any, debugError?: boolean): Promise<ExpressApp>
}

global.runExpressApp = async function setAppLocation(appLocation: string = './tests/__fixtures__', eventListener?: any, debugError?: boolean): Promise<ExpressApp> {
  currentApp = new ExpressApp({ appLocation, port: fDefaultPort })

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
