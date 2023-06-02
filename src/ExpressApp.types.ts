import { TimeMeasurer } from '@universal-packages/time-measurer'
import { CookieParseOptions } from 'cookie-parser'
import { CorsOptions } from 'cors'
import { RequestHandler } from 'express'
import { HelmetOptions } from 'helmet'
import { ListenOptions } from 'net'

import BaseMiddleware from './BaseMiddleware'

export type HTTPVerb = 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'
export type BodyParser = 'json' | 'raw' | 'text' | 'urlencoded'
export type MiddlewareLike = typeof BaseMiddleware | RequestHandler
export type MiddlewareStrategy = 'each' | 'global'

export interface ExpressAppOptions extends ListenOptions {
  appLocation: string
  bodyParser?: BodyParser | BodyParser[]
  cookieParser?: { secret?: string; options: CookieParseOptions } | true
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
