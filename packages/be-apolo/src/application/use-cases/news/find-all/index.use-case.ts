import { INewsWhiteListDto } from '@/domain/dto/news.dto'
import { INewsRepository } from '@/infra/repositories/news/index.dto'
import { Injectable, PaginationEntity } from '@olympus/lib-hera'
import { IFindAllUseCase } from './index.dto'

@Injectable({ dep: ['NEWS_REPOSITORY'] })
export class NewsFindAllUseCase {
  constructor(private readonly newsRepository: INewsRepository.Implements) {
  }

  async execute(props:IFindAllUseCase.Input) {
    const news = await this.newsRepository.findAll(props)
    if (news.isError) return news.lanchError()
    const data = news.value.data.map((news) => news.whiteList)
    const response = new PaginationEntity<INewsWhiteListDto>({
      ...news.value,
      data
    })
    return response
  }
}
