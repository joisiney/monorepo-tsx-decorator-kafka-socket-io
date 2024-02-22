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
    pages: number
    total: number
  }
}
// export type IPagination<T> = {
//   data: T[]
//   count: number
//   totalPages: number
//   actualPage: number
//   hasNextPage: boolean
// }
