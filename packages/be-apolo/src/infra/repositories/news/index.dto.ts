
import { INewsDto } from '@/domain/dto/news.dto'
import { NewsEntity } from '@/domain/entities/news.entity'
import { Either, IOptional, NotFoundException, PaginationEntity } from '@olympus/lib-hera'



export namespace INewsRepository {
  export interface InputFindAll{
    page: number
    take: number
  }
  export interface Implements {
    findAll(props: INewsRepository.InputFindAll): Promise<Either<PaginationEntity<NewsEntity>, NotFoundException>>
    findById(id: string): Promise<Either<NewsEntity, NotFoundException>>
    create(
      news: IOptional<INewsDto, 'id' | 'createdAt'>,
    ): Promise<Either<string, NotFoundException>>
    update(news: INewsDto): Promise<Either<string, NotFoundException>>
    delete(id: string): Promise<Either<boolean, NotFoundException>>
  }
}