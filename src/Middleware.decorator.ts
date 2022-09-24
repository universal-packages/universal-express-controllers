import { ClassDecorator, ClassDecoratorFunction } from '@universal-packages/namespaced-decorators'
import { MiddlewareDecoration } from './Middleware.types'
import { NAMESPACE } from './namespace'

export function Middleware(): ClassDecoratorFunction {
  const decoration: MiddlewareDecoration = { __type: 'middleware' }

  return ClassDecorator(NAMESPACE, decoration)
}
