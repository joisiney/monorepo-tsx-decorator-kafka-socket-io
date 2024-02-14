import { type IOptional } from '@olympus/lib-hera';
import { INewsDto } from '../dto/news.dto';
export declare class NewsEntity {
    protected data: INewsDto;
    constructor(_data: IOptional<INewsDto, 'id' | 'createdAt'>);
    get id(): string;
    get db(): INewsDto;
    get title(): string;
    toJSON(): {
        id: string;
        title: string;
        description: string;
        content: string;
        thumbnail: string;
    };
}
