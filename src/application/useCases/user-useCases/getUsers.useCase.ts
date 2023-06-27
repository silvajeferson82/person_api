import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUseCase } from '../IUseCase';
import { HTTPRequestError } from '@/core/infra/validations/errors/HTTPRequestError';

export class GetUsersUseCase implements IUseCase {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  public execute = async (): Promise<UserEntity[] | Error> => {
    const users = await this.userRepository.findAll();
    
    return users;
  }
}