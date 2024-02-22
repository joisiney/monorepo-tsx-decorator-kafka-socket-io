import { IPagination, IUserDto } from '@olympus/domain-ceos'

export namespace IPageUser {
  export interface QueryParams {
    pageParams: number[]
    pages: IPagination.Hydrate<IUserDto>[]
  }
}
