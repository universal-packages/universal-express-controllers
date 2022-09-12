import { Decoration } from '@universal-packages/namespaced-decorators'
import { Middleware } from './ExpressApp.types'

export interface ControllerUseDecoration<O = any> extends Decoration {
  __type: 'controller-use'
  middleware: Middleware
  options?: O
}
