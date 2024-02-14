export interface ICreateUseCase {
    name: string;
    email: string;
    address: string | null;
    birthdate: Date | null;
    password: string;
}
