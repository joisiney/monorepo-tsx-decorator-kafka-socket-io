import { IUserRepository } from '../../../../infra/repositories/user/index.dto';
import { IUpdateByIdUseCase } from './index.dto';
export declare class UserUpdateByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository.Implements);
    execute(props: IUpdateByIdUseCase): Promise<void | import("@olympus/domain-ceos").UserEntity>;
}
