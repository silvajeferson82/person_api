export interface IUseCase {
  execute(request: object): Promise<Object | Error >
}