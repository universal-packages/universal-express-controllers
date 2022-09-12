import { ClassDecorator, ClassDecoratorFunction } from '@universal-packages/namespaced-decorators'
import { MiddlewareDecoration } from './Middleware.types'
import { NAMESAPCE } from './namespace'

export function Middleware(): ClassDecoratorFunction {
  const decoration: MiddlewareDecoration = { __type: 'middleware' }

  return ClassDecorator(NAMESAPCE, decoration)
}
