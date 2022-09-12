import { ClassDecorator, ClassDecoratorFunction } from '@universal-packages/namespaced-decorators'
import { ControllerDecoration, ControllerOptions } from './Controller.types'
import { NAMESAPCE } from './namespace'

export function Controller(path?: string, options?: ControllerOptions): ClassDecoratorFunction {
  const decoration: ControllerDecoration = { __type: 'controller', path, options }

  return ClassDecorator(NAMESAPCE, decoration)
}
