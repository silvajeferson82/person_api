import { IUseCase } from '../IUseCase';
import { UserValidator } from '../../../core/infra/validations/userValidator';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { HTTPRequestError } from '../../..//core/infra/validations/errors/HTTPRequestError';
import { UserEntity } from '../../../domain/entities/user.entity';

export class UpdateUserUseCase implements IUseCase {

  constructor(
    private readonly userValidator: UserValidator,
    private readonly userRepository: UserRepository
  ) { }
  
  public execute = async (update: HTTPRequestObject): Promise<UserEntity | Error> => {
    const { id, user } = update
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      return new HTTPRequestError(HTTPRequestError.NOT_FOUND, id)
    }

    if (user.cpf !== userExists.cpf) {
      return new HTTPRequestError(HTTPRequestError.NOT_CHANGE, 'CPF')
    }

    if (user.email !== userExists.email) {
      return new HTTPRequestError(HTTPRequestError.NOT_CHANGE, 'EMAIL')
    }

    let validator = this.userValidator.validate(user);

    if (validator instanceof HTTPRequestError) { 
      return validator
    }

    const updatedUser = await this.userRepository.update(id, user);

    return updatedUser;
  }
}