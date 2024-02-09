interface IPaginationBoot {
    page: number
    take: number
}
interface IPaginationHydrate<T> {
    data: T[]
    page: number
    take: number
    skip: number
    pages: number
    total: number
}
export class PaginationEntity<T> {
    private _data!: T[]
    private _pages!: number
    private _total!: number
    private _skip!: number
    private _page!: number
    private _take!: number
    constructor(
        props: IPaginationBoot | IPaginationHydrate<T>,
    ) {
        if ('data' in props) {
            this.hydrate(props as IPaginationHydrate<T>)
        } else {
            this._page = props.page
            this._take = props.take
            this.boot(props as IPaginationBoot)
        }
    }

    private boot(props: IPaginationBoot) {
        this._skip = (props.page - 1) * props.take
    }

    private hydrate(props: IPaginationHydrate<T>) {
        this._data = props.data
        this._page = props.page
        this._take = props.take
        this._skip = props.skip
        this._pages = props.pages
        this._total = props.total
    }
    set data(value: T[]) {
        this._data = value
    }

    get data() {
        return this._data
    }

    get skip() {
        return this._skip
    }

    get take() {
        return this._take
    }

    get page() {
        return this._page
    }

    get pages() {
        return this._pages
    }

    public get total() {
        return this._total
    }

    set total(value: number) {
        this._pages = Math.ceil(value / this._take)
        this._total = value
    }

    toJSON() {
        const result = {
            page: this._page,
            take: this._take,
            skip: this._skip,
            pages: this._pages,
            total: this._total,
            data: this._data
        }
        return result;
    }
}