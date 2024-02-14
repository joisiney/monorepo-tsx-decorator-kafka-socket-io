import { INewsDto, NewsEntity } from '@olympus/domain-ceos';
import { Either, IOptional, IRequired, NotFoundException, PaginationEntity } from '@olympus/lib-hera';
export declare namespace INewsRepository {
    interface InputFindAll {
        page: number;
        take: number;
    }
    interface Implements {
        findAll(props: INewsRepository.InputFindAll): Promise<Either<PaginationEntity<NewsEntity>, NotFoundException>>;
        findById(id: string): Promise<Either<NewsEntity, NotFoundException>>;
        create(news: Omit<IOptional<INewsDto, 'id'>, 'createdAt'>): Promise<Either<string, NotFoundException>>;
        update(news: IRequired<Partial<INewsDto>, 'id'>): Promise<Either<string, NotFoundException>>;
        remove(id: string): Promise<Either<boolean, NotFoundException>>;
    }
}
