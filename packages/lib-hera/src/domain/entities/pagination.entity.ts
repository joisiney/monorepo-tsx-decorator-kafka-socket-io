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
    public data!: T[]
    private _pages!: number
    public _total!: number
    public skip!: number
    public page!: number
    public take!: number
    constructor(
        props: IPaginationBoot | IPaginationHydrate<T>,
    ) {
        if ('data' in props) {
            this.hydrate(props as IPaginationHydrate<T>)
        } else {
            this.page = props.page
            this.take = props.take
            this.boot(props as IPaginationBoot)
        }
    }
    
    private boot(props: IPaginationBoot) {
        this.skip = (props.page - 1) * props.take
    }

    private hydrate(props: IPaginationHydrate<T>) {
        this.data = props.data
        this.page = props.page
        this.take = props.take
        this.skip = props.skip
        this._pages = props.pages
        this._total = props.total
    }

    get pages() {
        return this._pages
    }

    get total() {
        return this._total
    }

    set total(value: number) {
        this._pages = Math.ceil(value / this.take)
        this._total = value
    }
}