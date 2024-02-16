import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Subscription } from '@olympus/kafka-persefone'
import { Injectable } from '@olympus/lib-hera'
import { ICreateUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY'] })
export class NewsCreateUseCase {
  constructor(private readonly newsRepository: INewsRepository.Implements) {}

  @Subscription({ topic: 'news.send-news' })
  async execute(props: ICreateUseCase) {
    const news = await this.newsRepository.create(props)
    if (news.isError) return news.lanchError()
    return news.value
  }
}
