import { INewsRepository } from '../../../../infra/repositories/news/index.dto';
import { IFindByIdUseCase } from './index.dto';
export declare class NewsFindByIdUseCase {
    private readonly newsRepository;
    constructor(newsRepository: INewsRepository.Implements);
    execute(props: IFindByIdUseCase): Promise<void | import("@olympus/domain-ceos").NewsEntity>;
}
