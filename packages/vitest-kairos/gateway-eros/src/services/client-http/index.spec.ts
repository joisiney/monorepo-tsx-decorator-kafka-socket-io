import { HttpClient } from '@olympus/gateway-eros/src/services/client-http'
import { IApiClient } from '@olympus/gateway-eros/src/services/client-http/dto/http-client.dto'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('HttpClient', () => {
  const url = 'http://olympus.com'
  const config = {}
  const data = {}
  let apiClient: IApiClient
  let httpClient: HttpClient

  beforeEach(() => {
    apiClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    }
    httpClient = new HttpClient(apiClient)
  })

  it('should call get method of api client', async () => {
    await httpClient.get(url, config)
    expect(apiClient.get).toHaveBeenCalledWith(url, config)
  })

  it('should call post method of api client', async () => {
    await httpClient.post(url, data, config)
    expect(apiClient.post).toHaveBeenCalledWith(url, data, config)
  })

  it('should call put method of api client', async () => {
    await httpClient.put(url, data, config)
    expect(apiClient.put).toHaveBeenCalledWith(url, data, config)
  })

  it('should call delete method of api client', async () => {
    await httpClient.delete(url, config)
    expect(apiClient.delete).toHaveBeenCalledWith(url, config)
  })
})
