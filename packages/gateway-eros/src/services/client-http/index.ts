import { IApiClient } from './dto/http-client.dto'

export class HttpClient {
  constructor(public api: IApiClient) {}
  public async get<T>(url: string, config?: any) {
    try {
      const response = await this.api.get<T>(url, config)
      return response as T
    } catch (e) {
      console.log('catch/depois', e)
    }
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
