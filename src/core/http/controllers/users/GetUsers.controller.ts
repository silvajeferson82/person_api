import { IUseCase } from '../../../../application/useCases/IUseCase';
import { clientError, HttpResponse, ok } from '../../../infra/HttpResponse';
import { Controller } from '../../../infra/Controller';
import { HTTPRequestError } from '../../../infra/validations/errors/HTTPRequestError';

export class GetUsersController implements Controller {
  constructor(private readonly getUsers: IUseCase) {}

  async handle(): Promise<HttpResponse> {
    const users: any = await this.getUsers.execute({});

    if (users instanceof HTTPRequestError) {
      return clientError(users);
    }

    return ok(users);
  }
}