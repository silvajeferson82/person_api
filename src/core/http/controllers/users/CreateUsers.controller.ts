import { IUseCase } from '../../../../application/useCases/IUseCase';
import { HttpResponse, created, clientError } from '../../../../core/infra/HttpResponse';
import { Controller } from '../../../infra/Controller';
import { HTTPRequestError } from '../../../../core/infra/validations/errors/HTTPRequestError';

export class CreateUsersController implements Controller {
  constructor(private readonly createUser: IUseCase) {}

  async handle({user}: HTTPRequestObject): Promise<HttpResponse> {
    const createdUser = await this.createUser.execute(user);

    if (createdUser instanceof HTTPRequestError) {
      return clientError(createdUser);
    }

    return created(createdUser);
  }
}