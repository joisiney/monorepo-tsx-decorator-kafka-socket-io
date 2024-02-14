import { IUserDto } from '@olympus/domain-ceos';
export declare class UserTypeORM implements IUserDto {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string | null;
    birthdate: Date | null;
    createdAt: Date;
    before(): Promise<void>;
    comparePassword(password: string): false | Promise<boolean>;
}
