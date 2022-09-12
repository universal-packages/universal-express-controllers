export interface ArgumentDecoration {
  __type: 'req' | 'res' | 'param' | 'params' | 'query' | 'body' | 'header' | 'headers' | 'middleware-options'
  property?: string
}
