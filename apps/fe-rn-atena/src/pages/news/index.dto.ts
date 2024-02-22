import { INewsDto, IPagination } from '@olympus/domain-ceos'

export namespace IPageNews {
  export interface QueryParams {
    pageParams: number[]
    pages: IPagination.Hydrate<INewsDto>[]
  }
}
