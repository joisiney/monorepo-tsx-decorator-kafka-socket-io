import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Injectable } from '@olympus/lib-hera'
import { IFindByIdUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY'] })
export class NewsFindByIdUseCase {
  constructor(private readonly newsRepository: INewsRepository.Implements) {}

  async execute(props: IFindByIdUseCase) {
    const news = await this.newsRepository.findById(props.id)
    if (news.isError) return news.lanchError()
    return news.value
  }
}
