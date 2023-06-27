
import { HTTPRequestError } from './errors/HTTPRequestError'

export class Taxpayer {
  private readonly taxpayerId: string

  get value(): string {
    return this.taxpayerId
  }

  private constructor(taxpayerId: string) {
    this.taxpayerId = taxpayerId
  }

  private static validateCPF(taxpayerId: string): boolean {
    taxpayerId = taxpayerId.replace(/[^\d]+/g, '')
    console.log(taxpayerId)
    if(taxpayerId == '') return false;

    if (taxpayerId.length != 11 ||
      taxpayerId == "00000000000" ||
      taxpayerId == "11111111111" ||
      taxpayerId == "22222222222" ||
      taxpayerId == "33333333333" ||
      taxpayerId == "44444444444" ||
      taxpayerId == "55555555555" ||
      taxpayerId == "66666666666" ||
      taxpayerId == "77777777777" ||
      taxpayerId == "88888888888" ||
      taxpayerId == "99999999999"
    ) {
      return false
    }

    // valid first digit
    let add = 0
    for (let i = 0; i < 9; i ++)
      add += parseInt(taxpayerId.charAt(i)) * (10 - i)
      let rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(taxpayerId.charAt(9)))
        return false

    // Valid second digit
    add = 0;
    for (let i = 0; i < 10; i ++)
      add += parseInt(taxpayerId.charAt(i)) * (11 - i)
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(taxpayerId.charAt(10)))
      return false

    return true
  }

  private static validateCNPJ(taxpayerId: string): boolean {
    taxpayerId = taxpayerId.replace(/[^\d]+/g,'');

    if(taxpayerId == '') return false;

    if (taxpayerId.length != 14)
        return false;

    // Remove invalid known taxpayerIds
    if (taxpayerId == "00000000000000" ||
        taxpayerId == "11111111111111" ||
        taxpayerId == "22222222222222" ||
        taxpayerId == "33333333333333" ||
        taxpayerId == "44444444444444" ||
        taxpayerId == "55555555555555" ||
        taxpayerId == "66666666666666" ||
        taxpayerId == "77777777777777" ||
        taxpayerId == "88888888888888" ||
        taxpayerId == "99999999999999")
        return false;

    let length = taxpayerId.length - 2
    let numbers = taxpayerId.substring(0, length)
    let digits = taxpayerId.substring(length)
    let sum: any = 0;
    let pos = length - 7
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--
      if (pos < 2)
        pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - sum % 11
    if (result != parseInt(digits.charAt(0)))
      return false

    length = length + 1
    numbers = taxpayerId.substring(0, length)
    sum = 0
    pos = length - 7
    for (let i = length; i >= 1; i--) {
      sum += parseInt(numbers.charAt(length - i)) * pos--
      if (pos < 2)
        pos = 9
    }

    result = sum % 11 < 2 ? 0 : 11 - sum % 11
    if (result != parseInt(digits.charAt(1)))
      return false

    return true
  }

  static validate(taxpayerId: string): boolean {
    return this.validateCPF(taxpayerId) || this.validateCNPJ(taxpayerId)
  }

  static create(taxpayerId: string): Taxpayer | HTTPRequestError {
    if (!this.validate(taxpayerId)) {
      return new HTTPRequestError(HTTPRequestError.TAXPAYER, taxpayerId)
    }

    return new Taxpayer(taxpayerId)
  }
}
