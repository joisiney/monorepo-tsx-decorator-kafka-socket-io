import { Injectable } from '@olympus/be-di-ilitia'
import { IApiClient } from './dto/http-client.dto'
@Injectable({ dep: ['HTTP_CLIENT'] })
export class HttpClient {
  constructor(public api: IApiClient) {}
  public async get<T>(url: string, config?: any) {
    return this.api.get<T>(url, config)
  }
  public async post<T>(url: string, data: any, config?: any) {
    return this.api.post<T>(url, data, config)
  }
  public async put<T>(url: string, data: any, config?: any) {
    return this.api.put<T>(url, data, config)
  }
  public async delete<T>(url: string, config?: any) {
    return this.api.delete<T>(url, config)
  }
}
