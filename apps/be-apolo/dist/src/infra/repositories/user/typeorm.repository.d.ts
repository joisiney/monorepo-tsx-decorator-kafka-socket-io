import { IUserDto, UserEntity } from '@olympus/domain-ceos';
import { Either, IOptional, IRequired, NotFoundException, PaginationEntity } from '@olympus/lib-hera';
import { IUserRepository } from './index.dto';
export declare class UserRepositoryTypeORM implements IUserRepository.Implements {
    private user;
    findAll(props: IUserRepository.InputFindAll): Promise<Either<PaginationEntity<UserEntity>, NotFoundException>>;
    findById(id: number): Promise<Either<UserEntity, NotFoundException>>;
    findByEmail(email: string): Promise<Either<UserEntity, NotFoundException>>;
    create(props: Omit<IOptional<IUserDto, 'id'>, 'createdAt'>): Promise<Either<boolean, NotFoundException>>;
    updateById({ id, ...props }: IRequired<Partial<IUserDto>, 'id'>): Promise<Either<UserEntity, NotFoundException>>;
    deleteById(id: number): Promise<Either<boolean, NotFoundException>>;
}
