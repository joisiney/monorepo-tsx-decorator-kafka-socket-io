import { type IOptional } from '@olympus/lib-hera'
import { INewsDto } from '../dto/news.dto'

export class NewsEntity {
  private data: INewsDto
  constructor(_data: IOptional<INewsDto, 'id' | 'createdAt'>) {
    this.data = {
      ..._data,
      id: _data.id || crypto.randomUUID(),
      createdAt: _data.createdAt || new Date(),
    }
  }

  get id() {
    return this.data.id
  }

  get db() {
    return this.data
  }

  toJSON() {
    const {createdAt, ...data} = this.data
    return data
  }
}