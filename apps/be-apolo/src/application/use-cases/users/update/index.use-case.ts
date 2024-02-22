import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'
import { IUpdateByIdUseCase } from './index.dto'

@Injectable({ dep: ['USER_REPOSITORY'] })
export class UserUpdateByIdUseCase {
  constructor(private readonly userRepository: IUserRepository.Implements) {}

  async execute(props: IUpdateByIdUseCase) {
    const news = await this.userRepository.updateById(props)
    if (news.isError) return news.lanchError()
    return news.value
  }
}
