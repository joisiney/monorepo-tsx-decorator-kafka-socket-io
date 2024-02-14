import { IUserRepository } from '@/infra/repositories/user/index.dto'
import { Injectable } from '@olympus/lib-hera'
import { IUserAllDto } from './index.dto'

@Injectable({ dep: ['USER_REPOSITORY'] })
export class UserFindAllUseCase {
  constructor(private readonly userRepository: IUserRepository.Implements) {}

  async execute(props:IUserAllDto) {
    const user = await this.userRepository.findAll(props)
    if (user.isError) return user.lanchError()
    return user.value
  }
}