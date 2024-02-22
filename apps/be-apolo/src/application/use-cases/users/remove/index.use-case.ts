import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/be-di-ilitia'

@Injectable({ dep: ['USER_REPOSITORY'] })
export class UserRemoveByIdUseCase {
  constructor(private readonly userRepository: IUserRepository.Implements) {}

  async execute(id: number) {
    const news = await this.userRepository.deleteById(id)
    if (news.isError) return news.lanchError()
    return news.value
  }
}
