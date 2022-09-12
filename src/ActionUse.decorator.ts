import { MethodDecorator, MethodDecoratorFunction } from '@universal-packages/namespaced-decorators'
import { ActionUseDecoration } from './ActionUse.types'
import { Middleware } from './ExpressApp.types'
import { NAMESAPCE } from './namespace'

export function ActionUse<O = Record<string, any>>(middleware: Middleware, options?: O): MethodDecoratorFunction {
  const decoration: ActionUseDecoration<O> = { __type: 'action-use', middleware, options }
  return MethodDecorator(NAMESAPCE, decoration)
}
