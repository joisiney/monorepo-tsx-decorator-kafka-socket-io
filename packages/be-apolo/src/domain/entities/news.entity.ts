import { type IOptional } from '@olympus/lib-hera'
import { INewsDto, INewsWhiteListDto } from '../dto/news.dto'

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

  get whiteList(): INewsWhiteListDto {
    return this.data
  }
}
