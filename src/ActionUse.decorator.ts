import { MethodDecorator, MethodDecoratorFunction } from '@universal-packages/namespaced-decorators'
import { ActionUseDecoration } from './ActionUse.types'
import { MiddlewareLike } from './ExpressApp.types'
import { NAMESPACE } from './namespace'

export function ActionUse<O = Record<string, any>>(middleware: MiddlewareLike, options?: O): MethodDecoratorFunction {
  const decoration: ActionUseDecoration<O> = { __type: 'action-use', middleware, options }
  return MethodDecorator(NAMESPACE, decoration)
}
