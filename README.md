# Express Controllers

[![npm version](https://badge.fury.io/js/@universal-packages%2Fexpress-controllers.svg)](https://www.npmjs.com/package/@universal-packages/express-controllers)
[![Testing](https://github.com/universal-packages/universal-express-controllers/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-express-controllers/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-express-controllers/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-express-controllers)

[Express](https://expressjs.com/) app builder based on decorated controller classes.

## Install

```shell
npm install @universal-packages/express-controllers
npm install express

# Optional as needed
npm install cookie-parser
npm install cors
npm install helmet
npm install pug
```

## ExpressApp

Express app is the main interface to build an express app from the decorated controllers and also start running a web server.

```js
import { ExpressApp } from '@universal-packages/express-controllers'

const expressApp = new ExpressApp({ appLocation: './src', port: 3000 })

// Load decorated controllers and middleware
await expressApp.prepare()
await expressApp.run()

// Once finishing
await expressApp.stop()
```

### Options

`ExpressApp` takes as options the same [ListenOptions from net](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/net.d.ts#L381), additionally takes the following ones:

- **`appLocation`** `String`
  Where should we look for controllers and middleware and load them?
- **`bodyParser`** `'json' | 'raw' | 'text' | 'urlencoded' | ('json' | 'raw' | 'text' | 'urlencoded')[]` `default: json`
  What body parser use across the app
- **`cors`** `CorsOptions | true`
  Enable cors for this app, optionally passing [CorsOptions](https://expressjs.com/en/resources/middleware/cors.html)
- **`cookieParser`** `CookieParseOptions | true`
  Enable cookie parser for this app, optionally passing [CookieParseOptions](https://www.npmjs.com/package/cookie-parser)
- **`helmet`** `HelmetOptions | true`
  Enable helmet for this app, optionally passing [HelmetOptions](https://helmetjs.github.io/)
- **`viewEngine`** `String`
  Sets the view renderer ([template engines](http://expressjs.com/en/guide/using-template-engines.html))

## BaseController

Use the base controller Class to enable your controller to use some goodies. It implement almost the same functionally as the [response](https://expressjs.com/en/4x/api.html#res) object so instead of doing `response.something()` you can directly call your controller instance.

```js
import { BaseController } from '@universal-packages/express-controllers'

export default class AuthController extends BaseController {
  async index() {
    this.status('OK').send('HOLA')
  }
}
```

## Decorators

Decorate your controller classes to enable them to respond to requests.

### @Controller()

Registers a class to behave as a controller. To be able to access `this.request` and `this.response` inside your controller actions you can extend your controller with the `BaseController`, it is not necessary but useful to access those object that way instead of using `Argument Decorators`.

> Controllers need to export the controller class as the default module in order to all work correctly.

#### arguments

- **`path`** `String` `default: /`
  This is the equivalent in pure express to: `app.use($path, router)`, internally you can see a controller as an express router object so this path will be prepended to all routes.
- **`options`** `Map`
  - **`bodyParser`** `'json' | 'raw' | 'text' | 'urlencoded' | ('json' | 'raw' | 'text' | 'urlencoded')[]` `default: json`
    What body parser use across this particular controller

```js
import { BaseController, Controller } from '@universal-packages/express-controllers'

@Controller('/auth', { bodyParser: 'json' })
export default class AuthController extends BaseController {}
```

### @ControllerUse()

Enables a middleware to execute before all controller actions.

#### arguments

- **`middleware`** `Middleware`
  A middleware function or middleware class
- **`options`** `Map`
  Any options the middleware may be prepared to receive (Class middleware)

```js
import { BaseController, Controller, ControllerUse } from '@universal-packages/express-controllers'
import RoleMiddleware from './RoleMiddleware'

@Controller('/auth', { bodyParser: 'json' })
@ControllerUse(RoleMiddleware, { roles: ['admin'] })
export default class AuthController extends BaseController {}
```

### @Action()

Enables a controller instance method to be called when the route matches.

#### arguments

- **`method`** `'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT'`
  The instance method will be called if the request method matches the configured one.
- **`path`** `String`
  Path to match to call this instance method, ex: `/users` or `users/:id`
- **`options`** `Map`
  - **`bodyParser`** `'json' | 'raw' | 'text' | 'urlencoded' | ('json' | 'raw' | 'text' | 'urlencoded')[]` `default: json`
    What body parser to use for this particular action.

```js
import { Action, BaseController, Controller } from '@universal-packages/express-controllers'

@Controller('/auth', { bodyParser: 'json' })
export default class AuthController extends BaseController {
  @Action('GET', { bodyParser: 'text' })
  async root() {
    this.response.send('Hola')
  }

  @Action('POST', '/login', { bodyParser: 'json' })
  async login() {
    const body = this.request.body
    this.response.send(`login with ${JSON.stringify(body)}`)
  }

  @Action('POST', '/signup')
  async signup() {
    const body = this.request.body
    this.response.send(`signup with ${JSON.stringify(body)}`)
  }
}
```

#### Fast equivalents

The following decorators behave the same as `@Action` the only difference is that they don't take the first argument since the decorator name describe the action method itself.

- **`@Delete()`**
- **`@Head()`**
- **`@Patch()`**
- **`@Post()`**
- **`@Put()`**

```js
import { BaseController, Controller, Get, Post } from '@universal-packages/express-controllers'

@Controller('/auth', { bodyParser: 'json' })
export default class AuthController extends BaseController {
  @Get()
  async root() {
    this.response.send('Hola')
  }

  @Post('/login')
  async login() {
    const body = this.request.body
    this.response.send(`login with ${JSON.stringify(body)}`)
  }

  @Post('/signup')
  async signup() {
    const body = this.request.body
    this.response.send(`signup with ${JSON.stringify(body)}`)
  }
}
```

### @ActionUse()

Enables a middleware to execute before a specific action.

#### arguments

- **`middleware`** `Middleware`
  A middleware function or middleware class
- **`options`** `Map`
  Any options the middleware may be prepared to receive (Class middleware)

```js
import { ActionUse, BaseController, Controller, Get } from '@universal-packages/express-controllers'
import SecureMiddleware from './SecureMiddleware'

@Controller('/auth', { bodyParser: 'json' })
export default class AuthController extends BaseController {
  @Get()
  @ActionUse(SecureMiddleware, { sometimes: true })
  async root() {
    this.response.send('Hola')
  }
}
```

### Arguments Decorators

You can simplify the code inside your actions by using argument decorators to get certain info from the request.

- **`@Body()`**
  Gets the request body.
  ```js
  async login(@Body() body) {
    this.response.json({ body })
  }
  ```
- **`@Header(name)`**
  Gets a specific header form the request header.
  ```js
  async login(@Header('Authentication') header) {
    this.response.json({ header })
  }
  ```
- **`@Headers()`**
  Gets the whole headers object form request.
  ```js
  async login(@Headers() headers) {
    this.response.json({ headers })
  }
  ```
- **`@Param()`**
  Gets a specific param parsed for the request.
  ```js
  async login(@Param('id') id) {
    this.response.json({ id })
  }
  ```
- **`@Params()`**
  Gets the whole params parsed object from the request.
  ```js
  async login(@Params() params) {
    this.response.json({ params })
  }
  ```
- **`@Res()`**
  Gets the whole response object.
  ```js
  async login(@Res() response) {
    response.json({ argument: 'yes' })
  }
  ```
- **`@Req()`**
  Gets the whole request object.
  ```js
  async login(@Req() request) {
    const body = request.body
    response.json({ argument: 'yes', body })
  }
  ```
- **`@Query()`**
  Gets the whole query object or a specific property in it.
  ```js
  async login(@Query() query, @Query('ordered') ordered) {
    this.response.json({ query, ordered })
  }
  ```

## BaseMiddleware

Use the base middleware Class to enable your middleware to use some goodies. It implement almost the same functionally as the [response](https://expressjs.com/en/4x/api.html#res) object so instead of doing `response.something()` you can directly call your middleware instance.

```js
import { BaseMiddleware } from '@universal-packages/express-controllers'

export default class AuthMiddleware extends BaseMiddleware {
  async middleware() {
    this.status('OK').send('HOLA')
  }
}
```

### Ending responses

When using class middleware if the middleware ends the equest, the `next()` chain is broken automatically and the request will not reach further more.

```js
import { BaseMiddleware } from '@universal-packages/express-controllers'

export default class AuthorizationMiddleware extends BaseMiddleware {
  async middleware() {
    this.status('UNAUTHORIZED').end()
  }
}
```

### @Middleware()

Registers a class to behave as a middleware. To be able to access `this.request` and `this.response` and `this.options` inside your middleware action you can extend your controller with the `BaseMiddleware`, is not necessary but useful to access those object that way instead of using `Argument Decorators`.

> Middleware need to export the middleware class as the default module in order to all work correctly.

```js
import { StatusCodes } from 'http-status-codes'
import createHttpError from 'http-errors'
import { BaseMiddleware, Middleware } from '@universal-packages/express-controllers'

@Middleware()
export default class AuthMiddleware extends BaseMiddleware {
  async middleware() {
    if (!this.request['user']) throw createHttpError(StatusCodes.UNAUTHORIZED)
  }
}
```

### Middleware Arguments Decorators

Middleware actions can use all the `Argument Decorators` plus one more to access middleware options

- **`@MiddlewareOptions()`**
  Gets the options passed to this middleware through `@ControllerUse()` or `@ActionUse()`

  ```js
  @Middleware()
  export default class AuthMiddleware extends BaseMiddleware {
    async middleware(@Request() request, @MiddlewareOptions() options) {
      if (options.sometimes && Math.random() > 0.5) {
        if (!request['user']) throw createHttpError(StatusCodes.UNAUTHORIZED)
      }
    }
  }
  ```

## Global middleware

In order to apply middleware to the whole app, you need to prepend your middleware files with `.middleware` all files in your project that will be loaded and added to the express app before starting building it with controller actions and other middleware.

Recommended structure:

```
- src
  |_ middleware
    |_ TopLevel.middleware.js|ts
    |_ top.middleware.js|ts
  |_ controllers
```

## Middleware as functions

You can use middleware as a pure `RequestHandler` function in both top level middleware and middleware passed through `@ControllerUse()` or `@ActionUse()`.

```js
export default function top(request, response, next) {
  request.context = {}
  next()
}
```

## Events

`ExpressApp` will emit events regarding request being processed.

```js
expressApp.on('request/start', ({ request }) => console.log(request))
expressApp.on('request/not-found', ({ request, response, measurement }) => console.log(request, response, measurement))
expressApp.on('request/error', ({ error, request, response, measurement }) => console.log(error, request, response, measurement))
expressApp.on('request/middleware', ({ name }) => console.log(name))
expressApp.on('request/handler', ({ request, handler }) => console.log(request, handler))
expressApp.on('request/end', ({ request, response, handler, measurement }) => console.log(request, response, handler, measurement))
```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
