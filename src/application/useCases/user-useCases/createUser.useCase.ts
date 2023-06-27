import { hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { IUseCase } from '../IUseCase';
import { HTTPRequestError } from '../../../core/infra/validations/errors/HTTPRequestError';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserValidator } from '../../../core/infra/validations/userValidator';

require('dotenv/config');

export class CreateUserUseCase implements IUseCase {

  constructor(
    private readonly userValidator: UserValidator,
    private readonly userRepository: UserRepository
  ) { }
  
  public execute = async (user: IRequestUser): Promise<UserEntity | Error> => {
    try {
      let validator = this.userValidator.validate(user)
  
      if (validator instanceof HTTPRequestError) {
        return validator
      }

      if (user.password !== user.password_confirmation) {
        return new HTTPRequestError(HTTPRequestError.MATCH_PASSWORD, 'password_confirmation')
      }

      delete user.password_confirmation

      user.password = await hash(user.password, 11);
  
      const createdUser = await this.userRepository.create(user);
  
      return createdUser;
    } catch (error) {
      if (error.code === 'P2002') {
        return new HTTPRequestError(HTTPRequestError.FIELD_EXISTS, 'CPF/EMAIL')
      }
      return error as Error
    }
  
  }
}