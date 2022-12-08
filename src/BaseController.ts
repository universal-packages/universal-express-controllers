import { CookieOptions, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

export default class BaseController {
  protected readonly request: Request
  protected readonly response: Response

  public constructor(request: Request, response: Response) {
    this.request = request
    this.response = response
  }

  protected clearCookie(name: string, options?: CookieOptions): this {
    this.response.clearCookie(name, options)
    return this
  }

  protected cookie(name: string, value: string, options?: CookieOptions): this {
    this.response.cookie(name, value, options)
    return this
  }

  protected async download(path: string): Promise<this> {
    return new Promise((resolve, reject): void => {
      this.response.download(path, (error: Error): void => {
        if (error) return reject(error)
        resolve(this)
      })
    })
  }

  protected end(): this {
    this.response.end()
    return this
  }

  protected format(formats: Record<string, () => void>): this {
    this.response.format(formats)
    return this
  }

  protected json(body: Record<string, any>): this {
    this.response.json(body)
    return this
  }

  protected jsonp(body: Record<string, any>): this {
    this.response.jsonp(body)
    return this
  }

  protected redirect(url: string): this {
    this.response.redirect(url)
    return this
  }

  protected render(view: string, locals?: Record<string, any>): this {
    this.response.render(view, locals)
    return this
  }

  protected send(body: any): this {
    this.response.send(body)

    return this
  }

  protected sendStatus(code: keyof typeof StatusCodes | number): this {
    this.response.sendStatus(typeof code === 'number' ? code : StatusCodes[code])

    return this
  }

  protected set(header: string, value: string): this {
    this.response.set(header, value)

    return this
  }

  protected status(code: keyof typeof StatusCodes | number): this {
    this.response.status(typeof code === 'number' ? code : StatusCodes[code])

    return this
  }
}
