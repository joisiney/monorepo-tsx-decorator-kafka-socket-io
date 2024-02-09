import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Injectable } from '@olympus/lib-hera'
import { IRemoveByIdUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY'] })
export class NewsRemoveByIdUseCase {
  constructor(private readonly newsRepository: INewsRepository.Implements) {
  }

  async execute(props:IRemoveByIdUseCase.Input) {
    const news = await this.newsRepository.remove(props.id)
    if (news.isError) return news.lanchError()
    return news.value
  }
}
