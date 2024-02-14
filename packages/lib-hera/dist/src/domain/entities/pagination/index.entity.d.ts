import { IPagination } from './index.dto';
export declare class PaginationEntity<T> {
    private _data;
    private _pages;
    private _total;
    private _skip;
    private _page;
    private _take;
    constructor(props: IPagination.Boot | IPagination.Hydrate<T>);
    private boot;
    private hydrate;
    set data(value: T[]);
    get data(): T[];
    get skip(): number;
    get take(): number;
    get page(): number;
    get pages(): number;
    get total(): number;
    set total(value: number);
    get pointer(): {
        skip: number;
        take: number;
    };
    toJSON(): {
        page: number;
        take: number;
        skip: number;
        pages: number;
        total: number;
        data: T[];
    };
}
