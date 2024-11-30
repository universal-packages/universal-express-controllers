import { ClassDecorator, ClassDecoratorFunction } from '@universal-packages/namespaced-decorators'

import { MiddlewareDecoration, MiddlewareDecoratorOptions } from './Middleware.types'
import { NAMESPACE } from './namespace'

export function Middleware(path?: string): ClassDecoratorFunction
export function Middleware(options?: MiddlewareDecoratorOptions): ClassDecoratorFunction
export function Middleware(path?: MiddlewareDecoratorOptions | string, options?: MiddlewareDecoratorOptions): ClassDecoratorFunction
export function Middleware(path?: MiddlewareDecoratorOptions | string, options?: MiddlewareDecoratorOptions): ClassDecoratorFunction {
  const actualPath = typeof path === 'string' ? path : undefined
  const actualOptions = typeof path === 'string' ? options : path
  const decoration: MiddlewareDecoration = { __type: 'middleware', path: actualPath, options: actualOptions }

  return ClassDecorator(NAMESPACE, decoration)
}
