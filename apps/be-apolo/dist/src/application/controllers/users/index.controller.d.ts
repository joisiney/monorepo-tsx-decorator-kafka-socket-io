import { UserCreateUseCase } from '../../../application/use-cases/users/create/index.use-case';
import { IUserAllDto } from '../../../application/use-cases/users/find-all/index.dto';
import { UserFindAllUseCase } from '../../../application/use-cases/users/find-all/index.use-case';
import { UserFindByIdUseCase } from '../../../application/use-cases/users/find-id/index.use-case';
import { UserRemoveByIdUseCase } from '../../../application/use-cases/users/remove/index.use-case';
import { UserUpdateByIdUseCase } from '../../../application/use-cases/users/update/index.use-case';
import { ControllerComposer } from '@olympus/lib-hera';
import { IUserCreateDto } from './dto/create.dto';
import { IUserIdDto } from './dto/id.dto';
import { IUserUpdateDto } from './dto/put.dto';
export declare class UserController extends ControllerComposer {
    private createUseCase;
    private findByIdUseCase;
    private findAllUseCase;
    private removeByIdUseCase;
    private updateByIdUseCase;
    constructor(createUseCase: UserCreateUseCase, findByIdUseCase: UserFindByIdUseCase, findAllUseCase: UserFindAllUseCase, removeByIdUseCase: UserRemoveByIdUseCase, updateByIdUseCase: UserUpdateByIdUseCase);
    save(data: IUserCreateDto): Promise<true | void>;
    findById({ id }: IUserIdDto): Promise<void | import("@olympus/domain-ceos").UserEntity>;
    findAll(props: IUserAllDto): Promise<void | import("@olympus/lib-hera").PaginationEntity<import("@olympus/domain-ceos").UserEntity>>;
    removeById({ id }: IUserIdDto): Promise<boolean | void>;
    updateById(props: IUserUpdateDto): Promise<void | import("@olympus/domain-ceos").UserEntity>;
}
