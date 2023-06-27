import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUseCase } from '../IUseCase';
import { HTTPRequestError } from '../../../core/infra/validations/errors/HTTPRequestError';

export class GetUserByIdUseCase implements IUseCase {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  public execute = async ({id}: HTTPRequestObject): Promise<UserEntity | Error> => {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return new HTTPRequestError(HTTPRequestError.NOT_FOUND, id);
    }
    
    return user;
  }
}