import { TimeMeasurer } from '@universal-packages/time-measurer'
import { CorsOptions } from 'cors'
import { RequestHandler } from 'express'
import { HelmetOptions } from 'helmet'
import { ListenOptions } from 'net'
import BaseMiddleware from './BaseMiddleware'

export type HTTPVerb = 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'
export type BodyParser = 'json' | 'raw' | 'text' | 'urlencoded'
export type Middleware = typeof BaseMiddleware | RequestHandler

export interface ExpressAppOptions extends ListenOptions {
  appLocation: string
  bodyParser?: BodyParser | BodyParser[]
  cookieParser?: { secret: string } | true
  cors?: CorsOptions | true
  helmet?: HelmetOptions | true
  viewEngine?: string | 'pug'
}

export interface MiddlewareInterface {
  middleware: RequestHandler
}

export interface RequestContext {
  requestMeasurer: TimeMeasurer
  handler?: string
}
