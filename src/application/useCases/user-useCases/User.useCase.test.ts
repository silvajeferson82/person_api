import { CreateUserUseCase } from './createUser.useCase'
import { GetUsersUseCase } from './getUsers.useCase';
import { UserEntity } from '../../../domain/entities/user.entity';
import { UserValidator } from '../../../core/infra/validations/userValidator';
import { GetUserByIdUseCase } from './getUserById.useCase';
import { UpdateUserUseCase } from './updateUser.useCse';
import { DeleteUserUseCase } from './deleteUser.useCase';
import { inMemoryUserRepository } from './__test__/repositories/inMemoryUser-repository';


let id = ''
let userRepository: any = null
let createUserUseCase: CreateUserUseCase 
let getUsersUseCase: GetUsersUseCase
let getUserByIdUseCase: GetUserByIdUseCase
let updateUserUseCase: UpdateUserUseCase
let deleteUserUseCase: DeleteUserUseCase

describe('User Repository Tests', () => {

beforeAll(async () => {
  userRepository = new inMemoryUserRepository()
  createUserUseCase = new CreateUserUseCase(new UserValidator(), userRepository)
  getUserByIdUseCase = new GetUserByIdUseCase(userRepository)
  getUsersUseCase = new GetUsersUseCase(userRepository)
  updateUserUseCase = new UpdateUserUseCase(new UserValidator(), userRepository)
  deleteUserUseCase = new DeleteUserUseCase(userRepository)
  let users = await getUsersUseCase.execute()
  id = users[0].id
}, 10000);
  test('create user', async () => {

    let user: IRequestUser = {
      name: 'Teste mock',
      email: 'mock@email.com',
      cpf: "169.944.150-23",
      password: '123456',
      password_confirmation: '123456',
      role: 'admin'
    }
    expect(createUserUseCase.execute(user)).resolves.not.toThrow()

    expect(userRepository.users).toEqual(
      expect.arrayContaining([
        expect.objectContaining(
          { name: 'Teste mock' },
        )
      ])
    )
  })

  test('return all users', async () => {
    const users = await getUsersUseCase.execute()
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeTruthy();
  
  });

  test('return user by id', async () => {
    const user = await getUserByIdUseCase.execute({ id }) as UserEntity
    expect(user).toBeTruthy();
    expect(user.id).toBe(id);
  });

  test('update user by id', async () => {
    const user: IRequestUser = {
      name: 'Teste mock update',
      email: 'mock@email.com',
      cpf: "169.944.150-23",
      password: '123456',
      role: 'admin'
    }

    const userUpdated = await updateUserUseCase.execute({ id, user })
  
    expect(userUpdated).toBeTruthy();
    expect(userUpdated.name).toBe(user.name);
  });

  test('delete user by id', async () => {
    const user = await deleteUserUseCase.execute({ id }) as UserEntity
    expect(user).toBeTruthy();
    expect(user.id).toBe(id);
  });

});