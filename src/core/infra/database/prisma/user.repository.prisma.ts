import { prisma } from './config/database';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../domain/repositories/user.repository';

export class UserRepositoryPrisma implements UserRepository {
  async findAll(): Promise<UserEntity[]> {
    const users = await prisma.user.findMany();

    return users;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
  
  async create(data: IRequestUser): Promise<UserEntity> {
    console.log(data)
    const user = await prisma.user.create({
      data: { ...data },
    });

    return user;
  }

  async update(id: string, data: UserEntity): Promise<UserEntity> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user;
  }

  async delete(id: string): Promise<UserEntity> {
    const user = await prisma.user.delete({
      where: { id },
    });

    return user;
  }
  
}
export { UserRepository };

