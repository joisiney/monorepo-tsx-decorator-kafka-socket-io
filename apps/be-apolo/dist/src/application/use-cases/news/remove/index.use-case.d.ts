import { INewsRepository } from '../../../../infra/repositories/news/index.dto';
import { IRemoveByIdUseCase } from './index.dto';
export declare class NewsRemoveByIdUseCase {
    private readonly newsRepository;
    constructor(newsRepository: INewsRepository.Implements);
    execute(props: IRemoveByIdUseCase): Promise<boolean | void>;
}
