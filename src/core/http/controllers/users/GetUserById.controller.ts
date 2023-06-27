import { IUseCase } from '../../../../application/useCases/IUseCase';
import { clientError, HttpResponse, ok, notFound } from '../../../infra/HttpResponse';
import { Controller } from '../../../infra/Controller';
import { HTTPRequestError } from '../../../infra/validations/errors/HTTPRequestError';

export class GetUserByIdController implements Controller {
  constructor(private readonly getUser: IUseCase) {}

  async handle({id}:HTTPRequestObject): Promise<HttpResponse> {
    const users: any = await this.getUser.execute({id});

    if (users instanceof HTTPRequestError) {
      return notFound(users);
    }

    return ok(users);
  }
}