import { Injectable } from '@olympus/be-di-ilitia'
import { IUserDto, PaginationEntity, UserEntity } from '@olympus/domain-ceos'
import {
  Either,
  IOptional,
  IRequired,
  Left,
  NotFoundException,
  Right,
} from '@olympus/lib-hera'
import { dataSource } from '../../database/typeorm/data-source'
import { UserTypeORM } from '../../database/typeorm/entities/user.entity'
import { IUserRepository } from './index.dto'

@Injectable({ name: 'USER_REPOSITORY' })
export class UserRepositoryTypeORM implements IUserRepository.Implements {
  private user = dataSource.getRepository(UserTypeORM)

  async findAll(
    props: IUserRepository.InputFindAll,
  ): Promise<Either<PaginationEntity<UserEntity>, NotFoundException>> {
    const paginationService = new PaginationEntity<UserEntity>({
      page: props.page,
      take: props.take,
    })
    const [users, total] = await this.user.findAndCount(
      paginationService.pointer,
    )
    if (!users?.length) {
      return new Left(new NotFoundException('Users not found'))
    }
    paginationService.data = users.map((user) => new UserEntity(user))
    paginationService.total = total
    return new Right(paginationService)
  }

  async findById(id: number): Promise<Either<UserEntity, NotFoundException>> {
    const user = await this.user.findOne({ where: { id } })
    if (!user) {
      return new Left(new NotFoundException('User not found'))
    }
    const userMapper = new UserEntity(user)
    return new Right(userMapper)
  }

  async findByEmail(
    email: string,
  ): Promise<Either<UserEntity, NotFoundException>> {
    const user = await this.user.findOne({ where: { email } })
    if (!user) {
      return new Left(new NotFoundException('User not found'))
    }
    const userMapper = new UserEntity(user)
    return new Right(userMapper)
  }

  async create(
    props: Omit<IOptional<IUserDto, 'id'>, 'createdAt'>,
  ): Promise<Either<boolean, NotFoundException>> {
    const hasUser = await this.findByEmail(props.email)
    if (hasUser.isSuccess) {
      return new Left(new NotFoundException('User already exists '))
    }
    const userDto = new UserTypeORM()
    userDto.name = props.name
    userDto.email = props.email
    userDto.password = props.password
    userDto.address = props.address
    userDto.birthdate = props.birthdate
    userDto.createdAt = new Date()
    const user = this.user.save(userDto)
    if (!user) {
      return new Left(new NotFoundException('User not created'))
    }
    return new Right(true)
  }

  async updateById({
    id,
    ...props
  }: IRequired<Partial<IUserDto>, 'id'>): Promise<
    Either<UserEntity, NotFoundException>
  > {
    const user = await this.user.findOne({ where: { id } })
    if (!user) {
      return new Left(new NotFoundException('User not found'))
    }
    const userUpdated = await this.user.update({ id }, props)
    const userMapper = new UserEntity({ ...user, ...props })
    return new Right(userMapper)
  }

  async deleteById(id: number): Promise<Either<boolean, NotFoundException>> {
    const user = await this.user.findOne({ where: { id } })
    if (!user) {
      return new Left(new NotFoundException('User not found'))
    }
    await this.user.delete({ id })
    return new Right(true)
  }
}
