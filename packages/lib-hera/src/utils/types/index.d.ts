export type IOptional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>
export type IPagination<T> = {
  data: T[]
  count: number
  totalPages: number
  actualPage: number
  hasNextPage: boolean
}
