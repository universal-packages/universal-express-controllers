import { ClassDecorator, ClassDecoratorFunction } from '@universal-packages/namespaced-decorators'

import { ControllerUseDecoration } from './ControllerUse.types'
import { MiddlewareLike } from './ExpressControllers.types'
import { NAMESPACE } from './namespace'

export function ControllerUse<O = any>(middleware: MiddlewareLike, options?: O): ClassDecoratorFunction {
  const decoration: ControllerUseDecoration<O> = { __type: 'controller-use', middleware, options }
  return ClassDecorator(NAMESPACE, decoration)
}
