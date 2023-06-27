
import { HTTPRequestError } from './errors/HTTPRequestError'

export class Name {
  private readonly name: string

  get value(): string {
    return this.name
  }

  private constructor(name: string) {
    this.name = name
  }

  static validate(name: string): boolean {
    if (!name || name.trim().length < 2 || name.trim().length > 255) {
      return false
    }

    if (name.split(/\s/).length < 2) {
      return false
    }

    return true
  }

  static create(name: string): Name | HTTPRequestError {
    // console.log(name)
    if (!this.validate(name)) {
      return new HTTPRequestError(HTTPRequestError.NAME, name)
    }

    return new Name(name)
  }
}
