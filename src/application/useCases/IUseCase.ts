import { Request } from 'express';

export interface IUseCase {
  execute(request: object): Promise<any | Error >
}