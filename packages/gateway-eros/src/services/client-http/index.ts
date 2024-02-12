import { AxiosApiClient } from './adapters/axios-client'
import { HttpClient } from './http-client'

export const api = new AxiosApiClient()
export const clientHttp = new HttpClient(api)
