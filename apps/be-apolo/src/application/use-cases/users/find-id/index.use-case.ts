import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/lib-hera'

@Injectable({ dep: ['USER_REPOSITORY'] })
export class UserFindByIdUseCase {
  constructor(private readonly userRepository: IUserRepository.Implements) {}

  async execute(id:number) {
    const user = await this.userRepository.findById(id)
    if (user.isError) return user.lanchError()
    return user.value
  }
}