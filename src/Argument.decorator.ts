import { ArgumentDecorator, ParameterDecoratorFunction } from '@universal-packages/namespaced-decorators'
import { ArgumentDecoration } from './Argument.types'
import { NAMESPACE } from './namespace'

export function Body(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'body' }
  return ArgumentDecorator(NAMESPACE, decoration)
}

export function Header(name: string): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'header', property: name }
  return ArgumentDecorator(NAMESPACE, decoration)
}

export function Headers(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'headers' }
  return ArgumentDecorator(NAMESPACE, decoration)
}

export function Param(name: string): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'param', property: name }
  return ArgumentDecorator(NAMESPACE, decoration)
}

export function Params(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'params' }
  return ArgumentDecorator(NAMESPACE, decoration)
}

export function Res(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'res' }
  return ArgumentDecorator(NAMESPACE, decoration)
}

export function Req(property?: string): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'req', property }
  return ArgumentDecorator(NAMESPACE, decoration)
}

export function Query(property?: string): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'query', property }
  return ArgumentDecorator(NAMESPACE, decoration)
}

export function MiddlewareOptions(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'middleware-options' }
  return ArgumentDecorator(NAMESPACE, decoration)
}
