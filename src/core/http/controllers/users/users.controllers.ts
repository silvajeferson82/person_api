import { Controller } from '../../../../core/infra/Controller';
import { UserRepositoryPrisma } from '../../../../core/infra/database/prisma/user.repository.prisma';
import { CreateUserUseCase } from '../../../../application/useCases/user-useCases/createUser.useCase';
import { UserValidator } from '../../../../core/infra/validations/userValidator';
import { CreateUsersController } from './CreateUsers.controller';
import { GetUsersController } from './GetUsers.controller';
import { GetUserByIdController} from './GetUserById.controller';
import { GetUsersUseCase } from '../../../../application/useCases/user-useCases/getUsers.useCase';
import { GetUserByIdUseCase } from '../../../../application/useCases/user-useCases/getUserById.useCase';
import { UpdateUserUseCase } from '../../../../application/useCases/user-useCases/updateUser.useCse';
import { UpdateUserController } from './UpdateUser.controller';
import { DeleteUserController } from './DeleteUser.controller';
import { DeleteUserUseCase } from '../../../../application/useCases/user-useCases/deleteUser.useCase';


export const makeCreateUsersController = (): Controller => {
  const userRepository = new UserRepositoryPrisma();
  const userValidator = new UserValidator();
  const createUserUseCase = new CreateUserUseCase(userValidator,userRepository);

  const createUsersController = new CreateUsersController(createUserUseCase);

  return createUsersController;
}

export const makeGetUsersController = (): Controller => {
  const userRepository = new UserRepositoryPrisma();
  const getUsersUseCase = new GetUsersUseCase(userRepository);

  const getUsersController = new GetUsersController(getUsersUseCase);

  return getUsersController;
}

export const makeGetUserByIdController = (): Controller => {
  const userRepository = new UserRepositoryPrisma();
  const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

  return getUserByIdController;
}

export const makeUpdateUserController = (): Controller => {
  const userRepository = new UserRepositoryPrisma();
  const userValidator = new UserValidator();
  const updateUserUseCase = new UpdateUserUseCase(userValidator,userRepository);

  const updateUserController = new UpdateUserController(updateUserUseCase);

  return updateUserController;
}

export const makeDeleteUserController = (): Controller => {
  const userRepository = new UserRepositoryPrisma();
  const deleteUserUseCase = new DeleteUserUseCase(userRepository);

  const deleteUserController = new DeleteUserController(deleteUserUseCase);

  return deleteUserController;
}