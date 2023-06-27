import { IRequestError } from "./IRequestError"

export class HTTPRequestError extends Error implements IRequestError {
  public static readonly NAME          = "InvalidNameError"
  public static readonly EMAIL         = "InvalidEmailError"
  public static readonly PARAM         = "HTTPRequestError"
  public static readonly TAXPAYER      = "InvalidTaxpayerError"
  public static readonly MISSING_PARAM = "MissingParamError"
  public static readonly FIELD_EXISTS  = "FieldExistError"
  public static readonly CLIENT_ERROR  = "ClientError"
  public static readonly NOT_CHANGE    = "NotChangeError"
  public static readonly NOT_FOUND     = "NotFound"
  public static readonly WEBHOOK       = "Fail"
  public static readonly DUPLICATE     = "duplicate"
  public static readonly GENERIC       = 'generic'
  public static readonly ACCESS_DENIED = 'access_danied'
  public static readonly VALID_PASSWORD = 'valid_password'
  public static readonly MATCH_PASSWORD = 'match_password'


  constructor(type: string, param: string) {
    super(HTTPRequestError.getErrorMessage(type, param));
    this.name = type
  }

  private static getErrorMessage(type: string, param: string): string {
    return {
      HTTPRequestError: `The received value for field '${param}' is invalid.`,
      InvalidNameError: `The name '${param}' is invalid.`,
      InvalidEmailError: `The email '${param}' is invalid.`,
      InvalidTaxpayerError: `The CPF '${param}' is invalid.`,
      MissingParamError: `The '${param}' parameter is missing in request body.`,
      FieldExistError: `The value '${param}' is already registered.`,
      NotFound: `No record found for ${param}`,
      NotChangeError: `It is not allowed to edit this parameter: ${param}`,
      ClientError: param,
      InvalidCardParams: `The card params are invalid `,
      Fail: `fail`,
      generic: 'Internal error',
      access_danied: `Invalid email or password`,
      valid_password: "password cannot have space or length less than 6 characters",
      match_password: "password and password confirmation does not match"
    }[type]
  }
}
