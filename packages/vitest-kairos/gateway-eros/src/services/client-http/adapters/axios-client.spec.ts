import { AxiosApiClient } from '@olympus/gateway-eros/src/services/client-http/adapters/axios-client'
import { IApiClient } from '@olympus/gateway-eros/src/services/client-http/dto/http-client.dto'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const url = 'http://olympus.com'
const config = {}
const data = { anything: true }
const fixturedData = { data }
let sut: IApiClient
let axiosInstance: AxiosApiClient
describe('HttpClient/axios-adapter', () => {
  beforeEach(() => {
    sut = {
      get: vi.fn().mockImplementation(() => Promise.resolve(fixturedData)),
      post: vi.fn().mockImplementation(() => Promise.resolve(fixturedData)),
      put: vi.fn().mockImplementation(() => Promise.resolve(fixturedData)),
      delete: vi.fn().mockImplementation(() => Promise.resolve(fixturedData)),
    }

    axiosInstance = new AxiosApiClient()
    axiosInstance.boot(url)
    const mock = axiosInstance as any
    mock.api = sut
  })

  it('should give an error if you don`t run the boot', async () => {
    axiosInstance = new AxiosApiClient()
    expect(() => axiosInstance.get(url, config)).rejects.toThrowError(
      'AxiosApiClient is not booted',
    )
  })
  it('should give an error if you don`t run the boot method with an invalid url', async () => {
    axiosInstance = new AxiosApiClient()
    expect(() => axiosInstance.boot()).toThrowError('BaseURL is required')
  })

  it('should return the mock data in the GET method', async () => {
    const response = await axiosInstance.get<{ anything: boolean }>(url, config)
    expect(response.anything).toBe(true)
  })
  it('should return the mock data in the POST method', async () => {
    const response = await axiosInstance.post<{ anything: boolean }>(
      url,
      data,
      config,
    )
    expect(response.anything).toBe(true)
  })
  it('should return the mock data in the PUT method', async () => {
    const response = await axiosInstance.put<{ anything: boolean }>(
      url,
      data,
      config,
    )
    expect(response.anything).toBe(true)
  })
  it('should return the mock data in the DELETE method', async () => {
    const response = await axiosInstance.delete<{ anything: boolean }>(
      url,
      data,
    )
    expect(response.anything).toBe(true)
  })
})
