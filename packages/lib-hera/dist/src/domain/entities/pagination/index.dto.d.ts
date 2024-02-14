export declare namespace IPagination {
    interface Boot {
        page: number;
        take: number;
    }
    interface Hydrate<T> {
        data: T[];
        page: number;
        take: number;
        skip: number;
        pages: number;
        total: number;
    }
}
