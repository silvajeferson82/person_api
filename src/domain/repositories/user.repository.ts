import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository { 
  abstract findAll(): Promise<UserEntity[]>;
  abstract findById(id: string): Promise<UserEntity | null>;
  abstract create(user: IRequestUser): Promise<UserEntity | Error>;
  abstract update(id: string, user: IRequestUser): Promise<UserEntity | Error>;
  abstract delete(id: string): Promise<UserEntity>;
}
