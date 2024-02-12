import { INewsDto, NewsEntity } from '@olympus/domain-ceos'

import {
  Either,
  IOptional,
  IRequired,
  Injectable,
  Left,
  NotFoundException,
  PaginationEntity,
  Right,
} from '@olympus/lib-hera'
import { INewsRepository } from './index.dto'

@Injectable({ name: 'NEWS_REPOSITORY' })
export class NewsMockRepository implements INewsRepository.Implements {
  private mockNews: NewsEntity[] = Array.from({ length: 100 }, (_, index) => {
    return new NewsEntity({
      id: index.toString(),
      title: `Title ${index}`,
      description: `Description ${index}`,
      content: `Content ${index}`,
      thumbnail: `https://api.lorem.space/image/face?w=100&h=100&data=${index}`,
    })
  })

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
  ): Promise<Either<string, NotFoundException>> {
    const hasNews = await this.has(news.id)
    if (hasNews) {
      return new Left(new NotFoundException('News already exists'))
    }
    const newNews = new NewsEntity(news)
    this.mockNews.push(newNews)
    return new Right(newNews.id)
  }

  private async has(id?: string): Promise<boolean> {
    if (!id) return false
    return this.mockNews.some((news) => news.id === id)
  }

  async update(
    news: IRequired<Partial<INewsDto>, 'id'>,
  ): Promise<Either<string, NotFoundException>> {
    const index = this.mockNews.findIndex((item) => item.id === news.id)
    if (index === -1) {
      return new Left(new NotFoundException('News not found'))
    }
    const clone = { ...this.mockNews[index], ...news } as INewsDto
    this.mockNews[index] = new NewsEntity(clone)
    return new Right(news.id)
  }

  async remove(id: string): Promise<Either<boolean, NotFoundException>> {
    const index = this.mockNews.findIndex((item) => item.id === id)
    if (index === -1) {
      return new Left(new NotFoundException('News not found'))
    }
    this.mockNews.splice(index, 1)
    return new Right(true)
  }
}
