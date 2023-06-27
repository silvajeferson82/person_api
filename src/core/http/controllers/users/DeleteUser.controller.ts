import { IUseCase } from '../../../../application/useCases/IUseCase';
import { clientError, HttpResponse, ok, notFound } from '../../../infra/HttpResponse';
import { Controller } from '../../../infra/Controller';
import { HTTPRequestError } from '../../../infra/validations/errors/HTTPRequestError';

export class DeleteUserController implements Controller {
  constructor(private readonly deleteUser: IUseCase) {}

  async handle({id}:HTTPRequestObject): Promise<HttpResponse> {
    const deletedUser: any = await this.deleteUser.execute({id});

    if (deletedUser instanceof HTTPRequestError) {
      return notFound(deletedUser);
    }

    return ok(deletedUser);
  }
}