import { IPagination } from '../dto'

export class PaginationEntity<T> {
  private _data!: T[]
  private _pages!: number
  private _total!: number
  private _skip!: number
  private _page!: number
  private _take!: number
  constructor(props: IPagination.Boot | IPagination.Hydrate<T>) {
    if ('data' in props) {
      this.hydrate(props as IPagination.Hydrate<T>)
    } else {
      this._page = props.page
      this._take = props.take
      this.boot(props as IPagination.Boot)
    }
  }

  private boot(props: IPagination.Boot) {
    this._skip = (props.page - 1) * props.take
  }

  private hydrate(props: IPagination.Hydrate<T>) {
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

  get next() {
    const _next = this._page + 1
    return _next > this._pages ? null : _next
  }
  get prev() {
    const _prev = this._page - 1
    return _prev < 1 ? null : _prev
  }

  public get total() {
    return this._total
  }

  set total(value: number) {
    this._pages = Math.ceil(value / this._take)
    this._total = value
  }

  get pointer() {
    return {
      skip: (this.page - 1) * this.take,
      take: this.take,
    }
  }
  toJSON() {
    const result = {
      page: this._page,
      take: this._take,
      skip: this._skip,
      next: this.next,
      prev: this.prev,
      pages: this._pages,
      total: this._total,
      data: this._data,
    }
    return result
  }
}
