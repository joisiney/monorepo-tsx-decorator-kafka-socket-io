import * as Exceptions from '@olympus/lib-hera/src/application/shared/exception'
import axios, { AxiosInstance } from 'axios'
import { IApiClient } from '../client-http/dto/http-client.dto'

const classesToCheck = Object.keys(Exceptions)

export class AxiosApiClient implements IApiClient {
  private api!: AxiosInstance
  async get<T>(url: string, config?: any): Promise<T> {
    try {
      const response = await this.api.get<T>(url, config)
      return response.data as T
    } catch (e) {
      console.log(classesToCheck, e)
      throw e
    }
  }

  boot(url?: string) {
    if (!url) throw new Error('BaseURL is required')
    this.api = axios.create({
      baseURL: url,
    })
  }
}
