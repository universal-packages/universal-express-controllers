import { Decoration } from '@universal-packages/namespaced-decorators'

import { MiddlewareStrategy } from './ExpressControllers.types'

export interface MiddlewareDecoration extends Decoration {
  __type: 'middleware'
  path?: string
  options?: MiddlewareDecoratorOptions
}

export interface MiddlewareDecoratorOptions {
  strategy?: MiddlewareStrategy
}
