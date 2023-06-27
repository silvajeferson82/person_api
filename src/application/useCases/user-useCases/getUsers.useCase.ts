import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IUseCase } from '../IUseCase';

export class GetUsersUseCase implements IUseCase {

  constructor(
    private readonly userRepository: UserRepository
  ) { }

  public execute = async (): Promise<UserEntity[]> => {
    const users = await this.userRepository.findAll();
    
    return users;
  }
}