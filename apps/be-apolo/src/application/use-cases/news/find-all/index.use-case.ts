import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Injectable } from '@olympus/lib-hera'
import { IFindAllUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY'] })
export class NewsFindAllUseCase {
  constructor(private readonly newsRepository: INewsRepository.Implements) {}

  async execute(props: IFindAllUseCase) {
    const news = await this.newsRepository.findAll(props)
    if (news.isError) return news.lanchError()
    return news.value
  }
}
