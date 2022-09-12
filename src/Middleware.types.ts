import { Decoration } from '@universal-packages/namespaced-decorators'

export interface MiddlewareDecoration extends Decoration {
  __type: 'middleware'
}
