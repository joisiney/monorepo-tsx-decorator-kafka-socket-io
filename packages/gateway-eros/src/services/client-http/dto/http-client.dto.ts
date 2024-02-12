export interface IApiClient {
  get<T>(url: string, config?: any): Promise<T>
}
