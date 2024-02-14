import { INewsRepository } from '../../../../infra/repositories/news/index.dto';
import { IFindAllUseCase } from './index.dto';
export declare class NewsFindAllUseCase {
    private readonly newsRepository;
    constructor(newsRepository: INewsRepository.Implements);
    execute(props: IFindAllUseCase): Promise<void | import("@olympus/lib-hera").PaginationEntity<import("@olympus/domain-ceos").NewsEntity>>;
}
