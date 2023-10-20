import { ExpressApp } from '../src'

// node > 19 has some issues with fetch closing sockets on consecutive requests
if (process.env.CI || process.versions.node.startsWith('20')) {
  jest.retryTimes(5)
  jest.setTimeout(10000)
}

let currentApp: ExpressApp

declare global {
  function runExpressApp(appLocation?: string, eventListener?: any, debugError?: boolean): Promise<ExpressApp>
}

global.runExpressApp = async function setAppLocation(appLocation: string = './tests/__fixtures__', eventListener?: any, debugError?: boolean): Promise<ExpressApp> {
  currentApp = new ExpressApp({ appLocation, port: fDefaultPort })

  if (eventListener) currentApp.on('*', eventListener)
  if (debugError) currentApp.on('request/error', console.log)

  await currentApp.prepare()
  await currentApp.run()

  return currentApp
}

afterEach(async (): Promise<void> => {
  if (currentApp) currentApp.stop()

  currentApp = undefined
})
