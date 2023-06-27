import { UserEntity } from '../../../../../domain/entities/user.entity';
import { UserRepository } from '../../../../../domain/repositories/user.repository';
import crypto from 'crypto';

export class inMemoryUserRepository implements UserRepository {
  public users: UserEntity[] = [
    {
      id: "b8dc968e-b6f5-46f0-a234-9a5fa97e3b8a",
      name: 'Teste mock',
      email: 'mock@email.com',
      cpf: "169.944.150-23",
      password: '123456',
      role: 'admin'
    }
  ];

  async create(user: IRequestUser): Promise<UserEntity | Error> {
    this.users.push({
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      password: user.password,
      password_confirmation: user.password,
      role: user.role,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return this.users[0]
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users
  }
  
  async findById(id: string): Promise<UserEntity | null> {
    const user = this.users[0].id === id ? this.users[0] : null
    return user;
  }


  async update(id: string, user: IRequestUser): Promise<UserEntity | Error> {
    const updateUser = this.users.find(user => user.id === id)
    console.log(updateUser)
    if (!updateUser) throw new Error('User not found')

    updateUser.name = user.name
    updateUser.password = user.password

    return updateUser
  }

  async delete(id: string): Promise<UserEntity> {
    const deleteUser = this.users.find(user => user.id === id)

    return this.users.splice(this.users.indexOf(deleteUser as UserEntity), 1)[0]
  }
}