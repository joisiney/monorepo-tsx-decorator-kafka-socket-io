import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { IIoServer } from '@olympus/io-server-pluto'
import { IUpdateByIdUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY', 'IO_SERVER'] })
export class NewsUpdateByIdUseCase {
  constructor(
    private readonly newsRepository: INewsRepository.Implements,
    private serverIO: IIoServer.Implements,
  ) {}

  async execute(props: IUpdateByIdUseCase) {
    const news = await this.newsRepository.update(props)
    if (news.isError) return news.lanchError()
    this.serverIO.emitter('news-update', news.value)
    return news.value
  }
}
