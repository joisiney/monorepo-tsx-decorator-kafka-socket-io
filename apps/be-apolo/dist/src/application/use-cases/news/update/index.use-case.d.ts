import { INewsRepository } from '../../../../infra/repositories/news/index.dto';
import { IUpdateByIdUseCase } from './index.dto';
export declare class NewsUpdateByIdUseCase {
    private readonly newsRepository;
    constructor(newsRepository: INewsRepository.Implements);
    execute(props: IUpdateByIdUseCase): Promise<string | void>;
}
