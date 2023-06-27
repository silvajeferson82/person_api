import { HTTPRequestError } from './errors/HTTPRequestError';
import { RequiredFieldsValidator } from './RequiredFieldsValidator';
import { Name } from './Name';
import { Email } from './Email';
import { Taxpayer } from './Taxpayer';
import { Password } from './Password';

export class UserValidator {
  private requiredFieldsValidator: RequiredFieldsValidator

  constructor() {
    this.requiredFieldsValidator = new RequiredFieldsValidator()
  }

  public validate = (user: IRequestUser): HTTPRequestError | null => { 
    let userInvalidFields = this.requiredFieldsValidator.validate({
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
    })

    if (!!userInvalidFields) {
      return userInvalidFields
    }

    let createName = Name.create(user.name)
    if (createName instanceof HTTPRequestError) {
      return createName
    }

    let createEmail = Email.create(user.email)
    if (createEmail instanceof HTTPRequestError) {
      return createEmail
    }

    let createTaxpayer = Taxpayer.create(user.cpf)
    if (createTaxpayer instanceof HTTPRequestError) {
      return createTaxpayer
    }

    let createPassword = Password.create(user.password || user.password_confirmation)
    if (createPassword instanceof HTTPRequestError) {
      return createPassword
    }
   
    return null
  }
}