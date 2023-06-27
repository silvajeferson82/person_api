import { IUseCase } from '../../../../application/useCases/IUseCase';
import { clientError, HttpResponse, ok, notFound } from '../../../infra/HttpResponse';
import { Controller } from '../../../infra/Controller';
import { HTTPRequestError } from '../../../infra/validations/errors/HTTPRequestError';

export class UpdateUserController implements Controller {
  constructor(private readonly updateUser: IUseCase) {}

  async handle({id, user}:HTTPRequestObject): Promise<HttpResponse> {
    console.log({'aqui..':user})
    const users: any = await this.updateUser.execute({id, user});
    if (users instanceof HTTPRequestError) {
      return notFound(users);
    }

    return ok(users);
  }
}