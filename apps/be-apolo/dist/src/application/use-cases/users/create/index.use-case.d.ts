import { IUserRepository } from '../../../../infra/repositories/user/index.dto';
import { ICreateUseCase } from './index.dto';
export declare class UserCreateUseCase {
    private readonly userRepository;
    constructor(userRepository: IUserRepository.Implements);
    execute(props: ICreateUseCase): Promise<true | void>;
}
