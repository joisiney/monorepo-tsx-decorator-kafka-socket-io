import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { IIoServer } from '@olympus/io-server-pluto'
import { Injectable } from '@olympus/lib-hera'
import { IRemoveByIdUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY', 'IO_SERVER'] })
export class NewsRemoveByIdUseCase {
  constructor(
    private readonly newsRepository: INewsRepository.Implements,
    private serverIO: IIoServer.Implements,
  ) {}

  async execute(props: IRemoveByIdUseCase) {
    const news = await this.newsRepository.remove(props.id)
    if (news.isError) return news.lanchError()
    this.serverIO.emitter('news-delete', news.value)
    return news.value
  }
}
