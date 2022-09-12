import { ClassDecorator, ClassDecoratorFunction } from '@universal-packages/namespaced-decorators'
import { ControllerUseDecoration } from './ControllerUse.types'
import { Middleware } from './ExpressApp.types'
import { NAMESAPCE } from './namespace'

export function ControllerUse<O = any>(middleware: Middleware, options?: O): ClassDecoratorFunction {
  const decoration: ControllerUseDecoration<O> = { __type: 'controller-use', middleware, options }
  return ClassDecorator(NAMESAPCE, decoration)
}
