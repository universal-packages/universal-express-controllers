import { loadModules, ModuleRegistry } from '@universal-packages/module-loader'
import { ClassRegistry, ClassType, Decoration, getNamespace, MethodRegistry } from '@universal-packages/namespaced-decorators'
import { startMeasurement } from '@universal-packages/time-measurer'
import cors from 'cors'
import EventEmitter from 'events'
import express, { Express, NextFunction, Request, RequestHandler, Response, Router } from 'express'
import getPort from 'get-port'
import helmet from 'helmet'
import http from 'http'
import { StatusCodes } from 'http-status-codes'
import { HttpError } from 'http-errors'
import { ActionDecoration } from './Action.types'
import { ActionUseDecoration } from './ActionUse.types'
import { ArgumentDecoration } from './Argument.types'
import BaseMiddleware from './BaseMiddleware'
import { ControllerDecoration } from './Controller.types'
import { ControllerUseDecoration } from './ControllerUse.types'
import { BodyParser, ExpressAppOptions, Middleware, RequestContext } from './ExpressApp.types'
import { NAMESAPCE } from './namespace'
import { MiddlewareDecoration } from './Middleware.types'

export default class ExpressApp extends EventEmitter {
  public readonly options: ExpressAppOptions
  public readonly expressApp: Express
  public readonly httpServer: http.Server

  public constructor(options: ExpressAppOptions) {
    super()
    this.options = { bodyParser: 'json', ...options }
    this.expressApp = express()
    this.httpServer = http.createServer(this.expressApp)
  }

  public async prepare(): Promise<void> {
    await this.applyPreMiddleware()
    await this.loadMiddleware()
    await this.loadControllers()
    await this.applyPostMiddleware()
  }

  public async run(): Promise<void> {
    return new Promise(async (resolve, reject): Promise<void> => {
      const finalPort = this.options.port || (await getPort({ port: getPort.makeRange(3000, 3100) }))
      this.httpServer.on('error', reject)
      this.httpServer.listen({ ...this.options, port: finalPort }, resolve)
    })
  }

  public async stop(): Promise<void> {
    return new Promise(async (resolve, reject): Promise<void> => {
      this.httpServer.close((error: Error): void => {
        if (error) return reject(error)
        resolve()
      })
    })
  }

  private async applyPreMiddleware(): Promise<void> {
    this.expressApp.use((request: Request, _: Response, next: NextFunction): void => {
      const requestMeasurer = startMeasurement()
      request['requestContext'] = { requestMeasurer } as RequestContext
      this.emit('request/start', { event: 'request/start', request })
      next()
    })

    if (this.options.helmet) this.expressApp.use(helmet(this.options.helmet === true ? {} : this.options.helmet))
    if (this.options.cors) this.expressApp.use(cors(this.options.cors === true ? {} : this.options.cors))
  }

  private async applyPostMiddleware(): Promise<void> {
    this.expressApp.use((request: Request, response: Response, next: NextFunction): void => {
      const requestContext = request['requestContext'] as RequestContext
      response.statusCode = StatusCodes.NOT_FOUND
      this.emit('request/not-found', { event: 'request/not-found', request, measurement: requestContext.requestMeasurer.finish() })
      response.end()
    })

    this.expressApp.use((error: HttpError, request: Request, response: Response, _next: NextFunction): void => {
      const requestContext = request['requestContext'] as RequestContext
      error.status = error.status || StatusCodes.INTERNAL_SERVER_ERROR
      response.status(error.status)
      this.emit('request/error', { event: 'request/error', error, handler: requestContext.handler, request, measurement: requestContext.requestMeasurer.finish() })
      response.end()
    })
  }

  private async loadMiddleware(): Promise<void> {
    const thridPartyModules = await loadModules(this.options.appLocation, { conventionPrefix: 'universal-core-express-middleware' })
    const modules = await loadModules(this.options.appLocation, { conventionPrefix: 'middleware' })
    const finalModules = [
      ...thridPartyModules.sort((moduleA: ModuleRegistry, ModuleB: ModuleRegistry): number =>
        moduleA.location.replace(/^.*(\\|\/|\:)/, '') > ModuleB.location.replace(/^.*(\\|\/|\:)/, '') ? 1 : -1
      ),
      ...modules
    ]

    for (let i = 0; i < finalModules.length; i++) {
      const currentModule = finalModules[i]
      this.expressApp.use(this.generateMiddlewareHandler(currentModule.exports))
    }
  }

  private async loadControllers(): Promise<void> {
    const namespaceRegistry = await getNamespace(NAMESAPCE, this.options.appLocation, 'controller')

    if (namespaceRegistry) {
      const erroredModule = namespaceRegistry.importedModules.find((module: ModuleRegistry): boolean => !!module.error)
      if (erroredModule) throw erroredModule.error

      /// Edge cases -------------------------------
      const notRegisteredClass = namespaceRegistry.classes.find(
        (classRegistry: ClassRegistry): boolean =>
          classRegistry.decorations.filter((decoration: Decoration): boolean => decoration.__type === 'controller' || decoration.__type === 'middleware').length === 0
      )
      if (notRegisteredClass)
        throw new Error(`Class ${notRegisteredClass.name} make use of decorators but hasn't been registered with @Controller or @Middleware\n${notRegisteredClass.location}`)

      const dobbleRegisteredClass = namespaceRegistry.classes.find((classRegistry: ClassRegistry): boolean => {
        return classRegistry.decorations.filter((decoration: Decoration): boolean => decoration.__type === 'controller' || decoration.__type === 'middleware').length > 1
      })
      if (dobbleRegisteredClass)
        throw new Error(`Class ${dobbleRegisteredClass.name} class has been registred with multiple @Controller and/or @Middleware what?\n${dobbleRegisteredClass.location}`)
      /// Edge cases -------------------------------

      const middlewareClassRegistries = namespaceRegistry.classes.filter(
        (classRegistry: ClassRegistry): boolean => !!classRegistry.decorations.find((decoration: MiddlewareDecoration): boolean => decoration.__type === 'middleware')
      )

      const controllerClassesRegistries = namespaceRegistry.classes.filter(
        (classRegistry: ClassRegistry): boolean => !!classRegistry.decorations.find((decoration: ControllerDecoration): boolean => decoration.__type === 'controller')
      )

      for (let i = 0; i < controllerClassesRegistries.length; i++) {
        const currentClassRegistry = controllerClassesRegistries[i]
        const controllerDecoration = currentClassRegistry.decorations.find(
          (decoration: ControllerDecoration): boolean => decoration.__type === 'controller'
        ) as ControllerDecoration
        const controllerUseDecorations = currentClassRegistry.decorations.filter(
          (decoration: ControllerUseDecoration): boolean => decoration.__type === 'controller-use'
        ) as ControllerUseDecoration[]
        const router = Router()

        // Apply whole router level middleware
        for (let j = 0; j < controllerUseDecorations.length; j++) {
          const currentControllerUseDecoration = controllerUseDecorations[j]
          const middlewareClassRegistry = middlewareClassRegistries.find((registry: ClassRegistry): boolean => registry.target === currentControllerUseDecoration.middleware)
          const middlewareMethodRegistry = middlewareClassRegistry?.methods.find((methodRegisry: MethodRegistry): boolean => methodRegisry.propertyKey === 'middleware')

          router.use(this.generateMiddlewareHandler(currentControllerUseDecoration.middleware, currentControllerUseDecoration.options, middlewareMethodRegistry))
        }

        for (let j = 0; j < currentClassRegistry.methods.length; j++) {
          const currentMethodRegistry = currentClassRegistry.methods[j]
          const actionDecoration = currentMethodRegistry.decorations.find((decoration: ActionDecoration): boolean => decoration.__type === 'action') as ActionDecoration
          const actionUseDecorations = currentMethodRegistry.decorations.filter(
            (decoration: ActionUseDecoration): boolean => decoration.__type === 'action-use'
          ) as ActionUseDecoration[]

          const route = `/${actionDecoration.path || ''}`.replace(/\/+/g, '/').replace(/(.+)\/$/, '$1')
          const actionHandlers: RequestHandler[] = []

          // We prepare all middleware handlers that will process request befire this particular action
          for (let k = 0; k < actionUseDecorations.length; k++) {
            const currentActionUseDecorations = actionUseDecorations[k]
            const middlewareClassRegistry = middlewareClassRegistries.find((registry: ClassRegistry): boolean => registry.target === currentActionUseDecorations.middleware)
            const middlewareMethodRegistry = middlewareClassRegistry?.methods.find((methodRegisry: MethodRegistry): boolean => methodRegisry.propertyKey === 'middleware')

            actionHandlers.push(this.generateMiddlewareHandler(currentActionUseDecorations.middleware, currentActionUseDecorations.options, middlewareMethodRegistry))
          }

          // Just before the action process the request the body parser will parse the body for this particular request
          const parsers = [].concat(actionDecoration.options?.bodyParser || controllerDecoration.options?.bodyParser || this.options.bodyParser)
          const finalBodyParsers = parsers.map((parser: BodyParser): RequestHandler => express[parser]())
          actionHandlers.push(...finalBodyParsers)

          // And now the last is the actual action handler
          actionHandlers.push(this.generateActionHandler(currentMethodRegistry, currentClassRegistry.target))

          // And set the ruouter middlewares and action for this route
          router[actionDecoration.method.toLocaleLowerCase()](route, actionHandlers)
        }

        // The router works only for the controller path
        const routerNamespace = `/${controllerDecoration.path || ''}`.replace(/\/+/g, '/').replace(/(.+)\/$/, '$1')
        this.expressApp.use(routerNamespace, router)
      }
    } else {
      this.emit('warning', 'No controllers have been found')
    }
  }

  private generateMiddlewareHandler(middleware: Middleware, options?: Record<string, any>, middlewareMethodRegistry?: MethodRegistry): RequestHandler {
    if (middleware.prototype) {
      return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        this.emit('request/middleware', { event: 'request/middleware', name: middleware.name })
        try {
          const middlewareInstance = new (middleware as typeof BaseMiddleware)(request, response, options)
          const args = middlewareMethodRegistry ? this.generateActionArgs(middlewareMethodRegistry, request, response, options) : []
          await middlewareInstance.middleware(...args)
          next()
        } catch (error) {
          next(error)
        }
      }
    } else {
      return async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
          const functionName = /function\s+([\w\$]+)\s*\(/.exec(middleware.toString())
          this.emit('request/middleware', { event: 'request/middleware', name: functionName[1] })
          await (middleware as RequestHandler)(request, response, next)
        } catch (error) {
          next(error)
        }
      }
    }
  }

  private generateActionHandler(methodRegisry: MethodRegistry, target: ClassType): RequestHandler {
    return async (request: Request, response: Response, next: NextFunction): Promise<any> => {
      const requestContext = request['requestContext'] as RequestContext
      try {
        const handler = `${target.name}#${methodRegisry.propertyKey}`
        request['requestContext']['handler'] = handler
        this.emit('request/handler', { event: 'request/handler', handler, request })
        const controllerInstance = new target(request, response)
        const args = this.generateActionArgs(methodRegisry, request, response)

        const result = await controllerInstance[methodRegisry.propertyKey](...args)

        if (result) {
          if (typeof result === 'object') {
            response.json(result)
          } else {
            response.send(result)
          }
        }

        response.end()

        this.emit('request/end', { event: 'request/end', handler, measurement: requestContext.requestMeasurer.finish(), request })
      } catch (error) {
        next(error)
      }
    }
  }

  private generateActionArgs(methodRegisry: MethodRegistry, request: Request, response: Response, middlewareOptions?: any): any[] {
    const numberOfArguments = methodRegisry.arguments[0] ? methodRegisry.arguments[0].index + 1 : 0

    const finalArgs = new Array(numberOfArguments)

    for (let i = 0; i < methodRegisry.arguments.length; i++) {
      const currentArgumentRegistry = methodRegisry.arguments[i]
      const decoration = currentArgumentRegistry.decorations[0] as ArgumentDecoration

      switch (decoration.__type) {
        case 'body':
          finalArgs[currentArgumentRegistry.index] = request.body
          break
        case 'header':
          finalArgs[currentArgumentRegistry.index] = request.header(decoration.property)
          break
        case 'headers':
          finalArgs[currentArgumentRegistry.index] = request.headers
          break
        case 'param':
          finalArgs[currentArgumentRegistry.index] = request.params[decoration.property]
          break
        case 'params':
          finalArgs[currentArgumentRegistry.index] = request.params
          break
        case 'query':
          if (decoration.property) {
            finalArgs[currentArgumentRegistry.index] = request.query[decoration.property]
          } else {
            finalArgs[currentArgumentRegistry.index] = request.query
          }
          break
        case 'req':
          if (decoration.property) {
            finalArgs[currentArgumentRegistry.index] = request[decoration.property]
          } else {
            finalArgs[currentArgumentRegistry.index] = request
          }
          break
        case 'res':
          finalArgs[currentArgumentRegistry.index] = response
          break
        case 'middleware-options':
          finalArgs[currentArgumentRegistry.index] = middlewareOptions
      }
    }

    return finalArgs
  }
}
