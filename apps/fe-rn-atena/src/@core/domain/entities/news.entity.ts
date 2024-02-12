import { INewsDto, NewsEntity } from '@olympus/domain-ceos'
import { IOptional } from '@olympus/lib-hera'

export class AppNewsEntity extends NewsEntity {
  constructor(data: IOptional<INewsDto, 'id' | 'createdAt'>) {
    super(data)
  }
  hasUniqueTitle(title: string) {
    return this.data.title.trim().toUpperCase() === title.trim().toUpperCase()
  }
}
