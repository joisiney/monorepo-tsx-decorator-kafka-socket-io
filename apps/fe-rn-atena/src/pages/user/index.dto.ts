import { IUserDto } from '@olympus/domain-ceos'
import { IPagination } from '@olympus/lib-hera'

export namespace IPageUser {
  export interface QueryParams {
    pageParams: number[]
    pages: IPagination.Hydrate<IUserDto>[]
  }
}
