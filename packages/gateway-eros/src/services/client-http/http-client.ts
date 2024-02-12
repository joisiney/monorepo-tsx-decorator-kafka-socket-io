import { IApiClient } from './dto/http-client.dto'

export class HttpClient {
  constructor(private api: IApiClient) {}
  public async get<T>(url: string, config?: any) {
    return this.api.get<T>(url, config)
  }
}
