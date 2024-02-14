import { INewsRepository } from '../../../../infra/repositories/news/index.dto';
import { ICreateUseCase } from './index.dto';
export declare class NewsCreateUseCase {
    private readonly newsRepository;
    constructor(newsRepository: INewsRepository.Implements);
    execute(props: ICreateUseCase): Promise<true | void>;
}
