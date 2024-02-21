import { UserMock, UserMockList } from '@/utils/mocks/user.mock'
import { UserRepositoryTypeORM } from '@olympus/be-apolo/src/infra/repositories/user/typeorm.repository'
import { NotFoundException } from '@olympus/lib-hera'
import { beforeEach, describe, expect, it, vi } from 'vitest'

type ITypeORM = {
  findAndCount: (...rest: any[]) => Promise<any>
  findOne: (...rest: any[]) => Promise<any>
  save: (...rest: any[]) => Promise<any>
  update: (...rest: any[]) => Promise<any>
  delete: (...rest: any[]) => Promise<any>
}
describe('UserRepositoryTypeORM', () => {
  let repository: UserRepositoryTypeORM
  let user: ITypeORM

  beforeEach(() => {
    repository = new UserRepositoryTypeORM()
    user = (repository as any).user as ITypeORM
  })
  it('should find all user', async () => {
    const users = UserMockList(2)
    const total = users.length
    vi.spyOn(user, 'findAndCount').mockResolvedValueOnce([users, total])
    const sut = await repository.findAll({ page: 1, take: 2 })
    expect(sut.isSuccess).toBe(true)
    expect(sut.value.data.length).toBe(2)
  })

  it('should find user by id', async () => {
    const userMock = UserMock()
    vi.spyOn(user, 'findOne').mockResolvedValueOnce(userMock)
    const sut = await repository.findById(userMock.id)
    expect(sut.isSuccess).toBe(true)
    expect(sut.value.id).toBe(userMock.id)
  })

  it('should not find user by invalid id', async () => {
    vi.spyOn(user, 'findOne').mockResolvedValueOnce(undefined)
    const sut = await repository.findById(1)
    expect(sut.isError).toBe(true)
    expect(sut.error).toBeInstanceOf(NotFoundException)
  })

  it('should create user', async () => {
    const userMock = UserMock()
    vi.spyOn(user, 'save').mockResolvedValueOnce(userMock)
    vi.spyOn(user, 'findOne').mockResolvedValueOnce(undefined)
    const sut = await repository.create(userMock)
    expect(sut.isSuccess).toBe(true)
    expect(sut.value).toBe(true)
  })

  it('should update user', async () => {
    const userMock = UserMock()
    const userUpdate = UserMock({ id: userMock.id }, ['id', 'name'])

    vi.spyOn(user, 'findOne').mockResolvedValueOnce(userMock)
    vi.spyOn(user, 'update').mockResolvedValueOnce(userUpdate)

    const sut = await repository.updateById(userUpdate)
    expect(sut.isSuccess).toBe(true)
    expect(sut.value.id).toBe(userUpdate.id)
  })

  it('should remove user', async () => {
    const userMock = UserMock()
    vi.spyOn(user, 'findOne').mockResolvedValueOnce(userMock)
    vi.spyOn(user, 'delete').mockResolvedValueOnce(true)

    const sut = await repository.deleteById(userMock.id)
    expect(sut.isSuccess).toBe(true)
    expect(sut.value).toBe(true)
  })

  it('should remove user by invalid id', async () => {
    vi.spyOn(user, 'findOne').mockResolvedValueOnce(undefined)
    const sut = await repository.deleteById(-1)
    expect(sut.isError).toBe(true)
    expect(sut.error).toBeInstanceOf(NotFoundException)
  })
})
