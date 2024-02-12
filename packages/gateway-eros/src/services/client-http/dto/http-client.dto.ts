export interface IApiClient {
  get<T>(url: string, config?: any): Promise<T>
  post<T>(url: string, data: any, config?: any): Promise<T>
  put<T>(url: string, data: any, config?: any): Promise<T>
  delete<T>(url: string, config?: any): Promise<T>
}
