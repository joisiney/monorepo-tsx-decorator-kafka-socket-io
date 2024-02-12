import { INewsDto, NewsEntity } from '@olympus/domain-ceos'
import { IOptional } from '@olympus/lib-hera'

export class AppNewsEntity extends NewsEntity {
  constructor(data: IOptional<INewsDto, 'id' | 'createdAt'>) {
    super(data)
  }
  hasUniqueTitle(title: string) {
    return this.data.title.trim().toUpperCase() === title.trim().toUpperCase()
  }

  toCreate() {
    return {
      title: this.data.title,
      description: this.data.description,
      content: this.data.content,
      thumbnail: this.data.thumbnail,
    }
  }
  toUpdate() {
    return {
      id: this.data.id,
      title: this.data.title,
      description: this.data.description,
      content: this.data.content,
      thumbnail: this.data.thumbnail,
    }
  }
}
