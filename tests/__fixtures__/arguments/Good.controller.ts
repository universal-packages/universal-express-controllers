import { BaseController, Body, Controller, Get, Header, Headers, Param, Params, Post, Query, Req, Res } from '../../../src'

@Controller('good/:cp', { bodyParser: 'json' })
export default class GoodController extends BaseController {
  @Post('body')
  public async getBody(@Body() body: any): Promise<void> {
    this.response.json({ body })
  }

  @Get('header')
  public async getHeader(@Header('sample') header: any): Promise<void> {
    this.response.json({ header })
  }

  @Get('headers')
  public async getHeaders(@Headers() headers: any): Promise<void> {
    this.response.json({ headers })
  }

  @Get('param/:id')
  public async getParam(@Param('id') param: any, @Param('cp') controllerParam: any): Promise<void> {
    this.response.json({ param, controllerParam })
  }

  @Get('params/:id')
  public async getParams(@Params() params: any): Promise<void> {
    this.response.json({ params })
  }

  @Get('response')
  public async getResponse(@Res() response: any): Promise<void> {
    this.response.json(Object.keys(response))
  }

  @Get('request')
  public async getRequest(@Req() request: any): Promise<void> {
    this.response.json(Object.keys(request))
  }

  @Get('request-p')
  public async getRequestP(@Req('route') route: any): Promise<void> {
    this.response.json({ route })
  }

  @Get('query')
  public async getQuery(@Query() query: any): Promise<void> {
    this.response.json({ query })
  }

  @Get('query-p')
  public async getQueryP(@Query('id') id: any): Promise<void> {
    this.response.json({ id })
  }
}
