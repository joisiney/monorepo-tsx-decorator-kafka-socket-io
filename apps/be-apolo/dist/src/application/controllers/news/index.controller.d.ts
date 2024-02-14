import { INewsKeyDto } from '../../../application/dto/id.dto';
import { NewsCreateUseCase } from '../../../application/use-cases/news/create/index.use-case';
import { NewsFindAllUseCase } from '../../../application/use-cases/news/find-all/index.use-case';
import { NewsFindByIdUseCase } from '../../../application/use-cases/news/find-id/index.use-case';
import { NewsRemoveByIdUseCase } from '../../../application/use-cases/news/remove/index.use-case';
import { NewsUpdateByIdUseCase } from '../../../application/use-cases/news/update/index.use-case';
import { ControllerComposer } from '@olympus/lib-hera';
import { INewsAllDto } from './dto/all.dto';
import { INewsDto } from './dto/news.dto';
import { INewsUpdateDto } from './dto/put.dto';
export declare class NewsController extends ControllerComposer {
    private findAllUseCase;
    private createUseCase;
    private findByIdUseCase;
    private updateByIdUseCase;
    private removeByIdUseCase;
    constructor(findAllUseCase: NewsFindAllUseCase, createUseCase: NewsCreateUseCase, findByIdUseCase: NewsFindByIdUseCase, updateByIdUseCase: NewsUpdateByIdUseCase, removeByIdUseCase: NewsRemoveByIdUseCase);
    newsAll(input: INewsAllDto): Promise<void | import("@olympus/lib-hera").PaginationEntity<import("@olympus/domain-ceos").NewsEntity>>;
    newsById(input: INewsKeyDto): Promise<void | import("@olympus/domain-ceos").NewsEntity>;
    newsCreate(data: INewsDto): Promise<true | void>;
    newsUpdate(input: INewsUpdateDto): Promise<string | void>;
    newsDelete(input: INewsKeyDto): Promise<boolean | void>;
}
