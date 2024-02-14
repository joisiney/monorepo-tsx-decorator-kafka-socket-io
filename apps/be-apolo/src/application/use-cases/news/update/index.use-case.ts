import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Injectable } from '@olympus/lib-hera'
import { IUpdateByIdUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY'] })
export class NewsUpdateByIdUseCase {
  constructor(private readonly newsRepository: INewsRepository.Implements) {}

  async execute(props: IUpdateByIdUseCase) {
    const news = await this.newsRepository.update(props)
    if (news.isError) return news.lanchError()
    return news.value
  }
}
