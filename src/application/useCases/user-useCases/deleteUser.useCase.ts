import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUseCase } from '../IUseCase';
import { HTTPRequestError } from '../../../core/infra/validations/errors/HTTPRequestError';

export class DeleteUserUseCase implements IUseCase {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  public execute = async ({id}: HTTPRequestObject): Promise<UserEntity | Error> => {
    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      return new HTTPRequestError(HTTPRequestError.NOT_FOUND, id);
    }

    const user = await this.userRepository.delete(id);
    
    return user;
  }
}