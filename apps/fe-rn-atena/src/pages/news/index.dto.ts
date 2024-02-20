import { INewsDto } from '@olympus/domain-ceos'
import { IPagination } from '@olympus/lib-hera'

export namespace IPageNews {
  export interface QueryParams {
    pageParams: number[]
    pages: IPagination.Hydrate<INewsDto>[]
  }
}
