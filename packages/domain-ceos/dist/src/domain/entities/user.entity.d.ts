import { type IOptional } from '@olympus/lib-hera';
import { IUserDto } from '../dto/user.dto';
export declare class UserEntity {
    protected data: IUserDto;
    constructor(_data: IOptional<IUserDto, 'id' | 'createdAt'>);
    get id(): number;
    get db(): IUserDto;
    toJSON(): {
        id: number;
        name: string;
        email: string;
        address: string | null;
        birthdate: Date | null;
        createdAt: Date;
    };
}
