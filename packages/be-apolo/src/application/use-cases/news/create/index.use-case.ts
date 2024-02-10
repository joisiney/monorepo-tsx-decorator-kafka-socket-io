import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Injectable } from '@olympus/lib-hera'
import { ICreateUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY'] })
export class NewsCreateUseCase {
  constructor(private readonly newsRepository: INewsRepository.Implements) {}

  async execute(props: ICreateUseCase.Input) {
    const news = await this.newsRepository.create(props)
    if (news.isError) return news.lanchError()
    return true
  }
}
