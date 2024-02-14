export interface IUserDto {
    id: number
    name: string
    email: string
    address: string | null
    birthdate: Date | null
    password: string
    createdAt: Date
}
