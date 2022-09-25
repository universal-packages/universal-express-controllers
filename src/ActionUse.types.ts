import { Decoration } from '@universal-packages/namespaced-decorators'
import { MiddlewareLike } from './ExpressApp.types'

export interface ActionUseDecoration<O = Record<string, any>> extends Decoration {
  __type: 'action-use'
  middleware: MiddlewareLike
  options?: O
}
