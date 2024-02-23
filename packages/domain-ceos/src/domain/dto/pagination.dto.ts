export namespace IPagination {
  export interface Boot {
    page: number
    take: number
  }
  export interface Hydrate<T> {
    data: T[]
    page: number
    take: number
    skip: number
    next: number
    prev: number
    pages: number
    total: number
  }
}
