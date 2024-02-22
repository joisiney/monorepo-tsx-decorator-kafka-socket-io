import { Injectable } from '@olympus/be-di-ilitia'
import { INewsDto, NewsEntity, PaginationEntity } from '@olympus/domain-ceos'
import {
  Either,
  IOptional,
  IRequired,
  Left,
  NotFoundException,
  Right,
} from '@olympus/lib-hera'
import { INewsRepository } from './index.dto'

@Injectable({ name: 'NEWS_REPOSITORY' })
export class NewsRepositoryMock implements INewsRepository.Implements {
  private mockNews: NewsEntity[] = []

  async findAll(
    props: INewsRepository.InputFindAll,
  ): Promise<Either<PaginationEntity<NewsEntity>, NotFoundException>> {
    const paginationService = new PaginationEntity<NewsEntity>({
      page: props.page,
      take: props.take,
    })
    const data = this.mockNews.slice(
      paginationService.skip,
      paginationService.skip + paginationService.take,
    )
    paginationService.data = data
    paginationService.total = this.mockNews.length
    return new Right(paginationService)
  }

  async findById(id: string): Promise<Either<NewsEntity, NotFoundException>> {
    const response = this.mockNews.find((news) => news.id === id)
    if (response) {
      return new Right(response)
    }
    return new Left(new NotFoundException('News not found'))
  }

  async create(
    news: Omit<IOptional<INewsDto, 'id'>, 'createdAt'>,
  ): Promise<Either<NewsEntity, NotFoundException>> {
    const hasNews = await this.has(news.id)
    if (hasNews) {
      return new Left(new NotFoundException('News already exists'))
    }
    const newNews = new NewsEntity(news)
    this.mockNews.push(newNews)
    return new Right(newNews)
  }

  private async has(id?: string): Promise<boolean> {
    if (!id) return false
    return this.mockNews.some((news) => news.id === id)
  }

  async update(
    news: IRequired<Partial<INewsDto>, 'id'>,
  ): Promise<Either<NewsEntity, NotFoundException>> {
    const index = this.mockNews.findIndex((item) => item.id === news.id)
    if (index === -1) {
      return new Left(new NotFoundException('News not found'))
    }
    const clone = { ...this.mockNews[index], ...news } as INewsDto
    const updated = new NewsEntity(clone)
    this.mockNews[index] = updated
    return new Right(updated)
  }

  async remove(
    id: string,
  ): Promise<Either<Pick<INewsDto, 'id'>, NotFoundException>> {
    const index = this.mockNews.findIndex((item) => item.id === id)
    if (index === -1) {
      return new Left(new NotFoundException('News not found'))
    }
    this.mockNews.splice(index, 1)
    return new Right({ id })
  }
}
