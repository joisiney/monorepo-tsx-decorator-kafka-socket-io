import { IUserRepository } from '../../../../infra/repositories/user/index.dto';
export declare class UserRemoveByIdUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository.Implements);
    execute(id: number): Promise<boolean | void>;
}
