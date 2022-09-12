import { ArgumentDecorator, ParameterDecoratorFunction } from '@universal-packages/namespaced-decorators'
import { ArgumentDecoration } from './Argument.types'
import { NAMESAPCE } from './namespace'

export function Body(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'body' }
  return ArgumentDecorator(NAMESAPCE, decoration)
}

export function Header(name: string): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'header', property: name }
  return ArgumentDecorator(NAMESAPCE, decoration)
}

export function Headers(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'headers' }
  return ArgumentDecorator(NAMESAPCE, decoration)
}

export function Param(name: string): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'param', property: name }
  return ArgumentDecorator(NAMESAPCE, decoration)
}

export function Params(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'params' }
  return ArgumentDecorator(NAMESAPCE, decoration)
}

export function Res(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'res' }
  return ArgumentDecorator(NAMESAPCE, decoration)
}

export function Req(property?: string): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'req', property }
  return ArgumentDecorator(NAMESAPCE, decoration)
}

export function Query(property?: string): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'query', property }
  return ArgumentDecorator(NAMESAPCE, decoration)
}

export function MiddlewareOptions(): ParameterDecoratorFunction {
  const decoration: ArgumentDecoration = { __type: 'middleware-options' }
  return ArgumentDecorator(NAMESAPCE, decoration)
}
