export interface IGenericObject {
  [key: string]: string
}
export interface IRequest {
  params?: IGenericObject
  query?: IGenericObject
  body?: IGenericObject
  headers: IGenericObject
  ip: string
  ips: string[]
  socket: IGenericObject
}
export interface IResponse {
  status(code: number): IResponse
  header(key: string, value: string): IResponse
  send(response: any): void
}
