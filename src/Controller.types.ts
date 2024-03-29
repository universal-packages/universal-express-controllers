import { Decoration } from '@universal-packages/namespaced-decorators'

import { BodyParser } from './ExpressControllers.types'

export interface ControllerOptions {
  bodyParser?: BodyParser | BodyParser[] | 'none'
}

export interface ControllerDecoration extends Decoration {
  __type: 'controller'
  path: string
  options: ControllerOptions
}
