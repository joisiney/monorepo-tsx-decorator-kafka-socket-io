import { NewsMock } from '@/utils/mocks/news.mock'
import { NewsRepositoryMock } from '@olympus/be-apolo/src/infra/repositories/news/mock.repository'
import { NotFoundException } from '@olympus/lib-hera'
import { beforeEach, describe, expect, it } from 'vitest'
describe('NewsRepositoryMock', () => {
  let repository: NewsRepositoryMock

  beforeEach(() => {
    repository = new NewsRepositoryMock()
  })
  it('should find all news', async () => {
    const newsMock = NewsMock()
    await repository.create(newsMock)
    const sut = await repository.findAll({ page: 1, take: 1 })
    expect(sut.isSuccess).toBe(true)
    expect(sut.value.data.length).toBe(1)
  })

  it('should find news by id', async () => {
    const newsMock = NewsMock()
    await repository.create(newsMock)
    const sut = await repository.findById(newsMock.id)
    expect(sut.isSuccess).toBe(true)
    expect(sut.value.id).toBe(newsMock.id)
  })

  it('should not find news by invalid id', async () => {
    const sut = await repository.findById('100')
    expect(sut.isError).toBe(true)
    expect(sut.error).toBeInstanceOf(NotFoundException)
  })

  it('should create news', async () => {
    const newsMock = NewsMock()
    const sut = await repository.create(newsMock)
    expect(sut.isSuccess).toBe(true)
    expect(sut.value.title).toBe(newsMock.title)
  })

  it('should update news', async () => {
    const newsMock = NewsMock()
    await repository.create(newsMock)
    const news = NewsMock({ id: newsMock.id }, ['id', 'title'])
    const sut = await repository.update(news)
    expect(sut.isSuccess).toBe(true)
    expect(sut.value.title).toBe(news.title)
  })

  it('should remove news', async () => {
    const newsMock = NewsMock()
    await repository.create(newsMock)
    const sut = await repository.remove(newsMock.id)
    expect(sut.isSuccess).toBe(true)
    expect(sut.value.id).toBe(newsMock.id)
  })
  it('should remove news by invalid id', async () => {
    const sut = await repository.remove('any-id')
    expect(sut.isError).toBe(true)
    expect(sut.error).toBeInstanceOf(NotFoundException)
  })
})
