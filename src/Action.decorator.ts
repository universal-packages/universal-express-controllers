import { MethodDecorator, MethodDecoratorFunction } from '@universal-packages/namespaced-decorators'

import { ActionDecoration, ActionOptions } from './Action.types'
import { HTTPVerb } from './ExpressApp.types'
import { NAMESPACE } from './namespace'

export function Action(method: HTTPVerb, path?: string): MethodDecoratorFunction
export function Action(method: HTTPVerb, options?: ActionOptions): MethodDecoratorFunction
export function Action(method: HTTPVerb, path?: string, options?: ActionOptions): MethodDecoratorFunction
export function Action(method: HTTPVerb, path?: string | ActionOptions, options?: ActionOptions): MethodDecoratorFunction
export function Action(method: HTTPVerb, path?: string | ActionOptions, options?: ActionOptions): MethodDecoratorFunction {
  const actualPath = typeof path === 'string' ? path : ''
  const actualOptions = typeof path === 'string' ? options : path
  const decoration: ActionDecoration = { __type: 'action', method, path: actualPath, options: actualOptions }

  return MethodDecorator(NAMESPACE, decoration)
}

export function Delete(path?: string): MethodDecoratorFunction
export function Delete(options?: ActionOptions): MethodDecoratorFunction
export function Delete(path?: string, options?: ActionOptions): MethodDecoratorFunction
export function Delete(path?: string | ActionOptions, options?: ActionOptions): MethodDecoratorFunction {
  return Action('DELETE', path, options)
}

export function Get(path?: string): MethodDecoratorFunction
export function Get(options?: ActionOptions): MethodDecoratorFunction
export function Get(path?: string, options?: ActionOptions): MethodDecoratorFunction
export function Get(path?: string | ActionOptions, options?: ActionOptions): MethodDecoratorFunction {
  return Action('GET', path, options)
}

export function Head(path?: string): MethodDecoratorFunction
export function Head(options?: ActionOptions): MethodDecoratorFunction
export function Head(path?: string, options?: ActionOptions): MethodDecoratorFunction
export function Head(path?: string | ActionOptions, options?: ActionOptions): MethodDecoratorFunction {
  return Action('HEAD', path, options)
}

export function Patch(path?: string): MethodDecoratorFunction
export function Patch(options?: ActionOptions): MethodDecoratorFunction
export function Patch(path?: string, options?: ActionOptions): MethodDecoratorFunction
export function Patch(path?: string | ActionOptions, options?: ActionOptions): MethodDecoratorFunction {
  return Action('PATCH', path, options)
}

export function Post(path?: string): MethodDecoratorFunction
export function Post(options?: ActionOptions): MethodDecoratorFunction
export function Post(path?: string, options?: ActionOptions): MethodDecoratorFunction
export function Post(path?: string | ActionOptions, options?: ActionOptions): MethodDecoratorFunction {
  return Action('POST', path, options)
}

export function Put(path?: string): MethodDecoratorFunction
export function Put(options?: ActionOptions): MethodDecoratorFunction
export function Put(path?: string, options?: ActionOptions): MethodDecoratorFunction
export function Put(path?: string | ActionOptions, options?: ActionOptions): MethodDecoratorFunction {
  return Action('PUT', path, options)
}
