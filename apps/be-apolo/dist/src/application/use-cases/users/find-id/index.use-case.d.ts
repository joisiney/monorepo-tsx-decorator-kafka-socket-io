import { IUserRepository } from '../../../../infra/repositories/user/index.dto';
export declare class UserFindByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository.Implements);
    execute(id: number): Promise<void | import("@olympus/domain-ceos").UserEntity>;
}
