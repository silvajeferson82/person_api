import { HttpResponse } from './HttpResponse';

export interface Controller<T = HTTPRequestObject> {
  handle: (request: T) => Promise<HttpResponse>
}
