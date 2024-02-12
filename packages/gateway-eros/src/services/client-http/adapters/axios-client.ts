import axios, { AxiosInstance } from 'axios'
import { IApiClient } from '../dto/http-client.dto'
export class AxiosApiClient implements IApiClient {
  private api!: AxiosInstance

  async post<T>(url: string, data: any, config?: any): Promise<T> {
    try {
      const response = await this.api.post<T>(url, data, config)
      return response.data as T
    } catch (e) {
      console.log(`[POST] ${url}`, e)
      throw e
    }
  }

  async put<T>(url: string, data: any, config?: any): Promise<T> {
    try {
      const response = await this.api.put<T>(url, data, config)
      return response.data as T
    } catch (e) {
      console.log(`[PUT] ${url}`, e)
      throw e
    }
  }

  async delete<T>(url: string, config?: any): Promise<T> {
    try {
      const response = await this.api.delete<T>(url, config)
      return response.data as T
    } catch (e) {
      console.log(`[DELETE] ${url}`, e)
      throw e
    }
  }

  async get<T>(url: string, config?: any): Promise<T> {
    try {
      const response = await this.api.get<T>(url, config)
      return response.data as T
    } catch (e) {
      console.log(`[GET] ${url}`, e)
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
