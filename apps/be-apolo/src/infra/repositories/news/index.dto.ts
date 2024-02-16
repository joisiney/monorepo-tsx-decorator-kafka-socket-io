import { INewsDto, NewsEntity } from '@olympus/domain-ceos'
import {
  Either,
  IOptional,
  IRequired,
  NotFoundException,
  PaginationEntity,
} from '@olympus/lib-hera'

export namespace INewsRepository {
  export interface InputFindAll {
    page: number
    take: number
  }
  export interface Implements {
    findAll(
      props: INewsRepository.InputFindAll,
    ): Promise<Either<PaginationEntity<NewsEntity>, NotFoundException>>
    findById(id: string): Promise<Either<NewsEntity, NotFoundException>>
    create(
      news: Omit<IOptional<INewsDto, 'id'>, 'createdAt'>,
    ): Promise<Either<NewsEntity, NotFoundException>>
    update(
      news: IRequired<Partial<INewsDto>, 'id'>,
    ): Promise<Either<NewsEntity, NotFoundException>>
    remove(id: string): Promise<Either<Pick<INewsDto, 'id'>, NotFoundException>>
  }
}
