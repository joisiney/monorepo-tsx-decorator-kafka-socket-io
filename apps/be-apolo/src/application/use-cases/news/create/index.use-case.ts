import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { IIoServer } from '@olympus/io-server-pluto'
import { Subscription } from '@olympus/kafka-persefone'
import { ICreateUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY', 'IO_SERVER'] })
export class NewsCreateUseCase {
  constructor(
    private readonly newsRepository: INewsRepository.Implements,
    private serverIO: IIoServer.Implements,
  ) {}

  @Subscription({ topic: 'news.send-news' })
  async execute(props: ICreateUseCase) {
    const news = await this.newsRepository.create(props)
    if (news.isError) return news.lanchError()
    this.serverIO.emitter('news-create', news.value)
    return news.value
  }
}
