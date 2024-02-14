import { IUserRepository } from '../../../../infra/repositories/user/index.dto';
import { IUserAllDto } from './index.dto';
export declare class UserFindAllUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository.Implements);
    execute(props: IUserAllDto): Promise<void | import("@olympus/lib-hera").PaginationEntity<import("@olympus/domain-ceos").UserEntity>>;
}
