import { UserCreateUseCase } from '@/application/use-cases/users/create/index.use-case'
import {
  IUserAllDto,
  userAllDto,
} from '@/application/use-cases/users/find-all/index.dto'
import { UserFindAllUseCase } from '@/application/use-cases/users/find-all/index.use-case'
import { UserFindByIdUseCase } from '@/application/use-cases/users/find-id/index.use-case'
import { UserRemoveByIdUseCase } from '@/application/use-cases/users/remove/index.use-case'
import { UserUpdateByIdUseCase } from '@/application/use-cases/users/update/index.use-case'
import {
  Controller,
  ControllerComposer,
  Injectable,
  Route,
} from '@olympus/lib-hera'
import { IUserCreateDto, userCreateDto } from './dto/create.dto'
import { IUserIdDto, userIdDto } from './dto/id.dto'
import { IUserUpdateDto, userUpdateDto } from './dto/put.dto'

@Controller('/olympus')
@Injectable({
  dep: [
    'UserCreateUseCase',
    'UserFindByIdUseCase',
    'UserFindAllUseCase',
    'UserRemoveByIdUseCase',
    'UserUpdateByIdUseCase',
  ],
})
export class UserController extends ControllerComposer {
  constructor(
    private createUseCase: UserCreateUseCase,
    private findByIdUseCase: UserFindByIdUseCase,
    private findAllUseCase: UserFindAllUseCase,
    private removeByIdUseCase: UserRemoveByIdUseCase,
    private updateByIdUseCase: UserUpdateByIdUseCase,
  ) {
    super()
  }

  @Route({ method: 'POST', url: '/user', dto: userCreateDto })
  async save(data: IUserCreateDto) {
    return this.createUseCase.execute(data)
  }

  @Route({ method: 'GET', url: '/user/:id', dto: userIdDto })
  async findById({ id }: IUserIdDto) {
    return this.findByIdUseCase.execute(id)
  }

  @Route({ method: 'GET', url: '/user', dto: userAllDto })
  async findAll(props: IUserAllDto) {
    return this.findAllUseCase.execute(props)
  }

  @Route({ method: 'DELETE', url: '/user/:id', dto: userIdDto })
  async removeById({ id }: IUserIdDto) {
    return this.removeByIdUseCase.execute(id)
  }

  @Route({ method: 'PUT', url: '/user/:id', dto: userUpdateDto })
  async updateById(props: IUserUpdateDto) {
    return this.updateByIdUseCase.execute(props)
  }
}
