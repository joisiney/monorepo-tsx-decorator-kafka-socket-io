import { NewsRepositoryMock } from '@olympus/be-apolo/src/infra/repositories/news/mock.repository'
import { INewsDto, NewsEntity } from '@olympus/domain-ceos'
import {
  IOptional,
  IRequired,
  NotFoundException,
  PaginationEntity,
} from '@olympus/lib-hera'
import { beforeEach, describe, expect, it } from 'vitest'
describe('NewsRepositoryMock', () => {
  let repository: NewsRepositoryMock

  beforeEach(() => {
    repository = new NewsRepositoryMock()
  })

  it('should find all news', async () => {
    const result = await repository.findAll({ page: 1, take: 1 })
    expect(result.isSuccess).toBe(true)
    const pagination = result.value as PaginationEntity<NewsEntity>
    expect(pagination.data.length).toBe(1)
  })

  it('should find news by id', async () => {
    const result = await repository.findById('0')
    expect(result.isSuccess).toBe(true)
    const news = result.value as NewsEntity
    expect(news.id).toBe('0')
  })

  it('should not find news by invalid id', async () => {
    const result = await repository.findById('100')
    expect(result.isError).toBe(true)
    expect(result.error).toBeInstanceOf(NotFoundException)
  })

  it('should create news', async () => {
    const news: Omit<IOptional<INewsDto, 'id'>, 'createdAt'> = {
      title: 'Title 2',
      description: 'Description 2',
      content: 'Content 2',
      thumbnail: 'https://api.lorem.space/image/face?w=100&h=100&data=2',
    }
    const result = await repository.create(news)
    expect(result.isSuccess).toBe(true)
    const createdNews = result.value as NewsEntity
    expect(createdNews.title).toBe(news.title)
  })

  it('should update news', async () => {
    const news: IRequired<Partial<INewsDto>, 'id'> = {
      id: '0',
      title: 'Updated Title',
    }
    const result = await repository.update(news)
    expect(result.isSuccess).toBe(true)
    const updatedNews = result.value as NewsEntity
    expect(updatedNews.title).toBe(news.title)
  })

  it('should remove news', async () => {
    const result = await repository.remove('any-id')
    expect(result.isError).toBe(true)
    expect(result.error).toBeInstanceOf(NotFoundException)
  })
})
