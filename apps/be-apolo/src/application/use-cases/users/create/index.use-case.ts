import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/lib-hera'
import { ICreateUseCase } from './index.dto'

@Injectable({ dep: ['USER_REPOSITORY'] })
export class UserCreateUseCase {
  constructor(private readonly userRepository: IUserRepository.Implements) {}

  async execute(props: ICreateUseCase) {
    const news = await this.userRepository.create(props)
    if (news.isError) return news.lanchError()
    return true
  }
}
