import { Decoration } from '@universal-packages/namespaced-decorators'

import { BodyParser, HTTPVerb } from './ExpressApp.types'

export interface ActionOptions {
  bodyParser?: BodyParser | BodyParser[] | 'none'
}

export interface ActionDecoration extends Decoration {
  __type: 'action'
  method: HTTPVerb
  path: string
  options: ActionOptions
}
