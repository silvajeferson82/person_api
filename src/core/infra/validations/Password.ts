
import { HTTPRequestError } from './errors/HTTPRequestError'

export class Password {
  private readonly password: string

  get value(): string {
    return this.password
  }

  private constructor(password: string) {
    this.password = password
  }

  static validate(password: string): boolean {
    if (!password || password.trim().length < 6 || password.trim().length > 255) {
      return false
    }

    return true
  }

  static create(password: string): Password | HTTPRequestError {
    // console.log(this.validate(password))
    if (!this.validate(password)) {
      return new HTTPRequestError(HTTPRequestError.VALID_PASSWORD, password)
    }

    return new Password(password)
  }
}
