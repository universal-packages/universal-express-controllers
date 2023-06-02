import { Decoration } from '@universal-packages/namespaced-decorators'

import { MiddlewareLike } from './ExpressApp.types'

export interface ControllerUseDecoration<O = any> extends Decoration {
  __type: 'controller-use'
  middleware: MiddlewareLike
  options?: O
}
