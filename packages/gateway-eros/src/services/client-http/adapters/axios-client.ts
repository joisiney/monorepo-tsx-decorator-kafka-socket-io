// import * as Exceptions from '@olympus/lib-hera/src/application/shared/exception'
import axios, { AxiosInstance } from 'axios'
import { IApiClient } from '../dto/http-client.dto'
// const classesToCheck = Object.keys(Exceptions)

export class AxiosApiClient implements IApiClient {
  private api!: AxiosInstance
  async get<T>(url: string, config?: any): Promise<T> {
    const response = await this.api.get<T>(url, config)

    return response.data as T
  }

  boot(url?: string) {
    if (!url) throw new Error('BaseURL is required')
    this.api = axios.create({
      baseURL: url,
      headers: {
        'content-type': 'application/json',
        'x-page': 1,
        'x-take': 12,
      },
    })
    this.api.interceptors.request.use((request) => {
      console.log(
        `[${request.method?.toUpperCase()}] ${request.baseURL}${request.url}`,
      )
      return request
    })
  }
}
