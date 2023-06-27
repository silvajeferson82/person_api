import { HTTPRequestError } from './errors/HTTPRequestError'

export class RequiredFieldsValidator<T = any> {
  public validate(data: T) {
    console.log('validate',data)
    const fields = Object.getOwnPropertyNames(data)
    for (const field of fields) {
      if (
        data[field] === null ||
        data[field] === undefined ||
        (typeof data[field] === 'string' && data[field].trim() === '') ||
        (typeof data[field] === 'number' && data[field] <= 0)
      ) {
        return (new HTTPRequestError(HTTPRequestError.MISSING_PARAM, field))
      }
    }

    return null
  }
}
