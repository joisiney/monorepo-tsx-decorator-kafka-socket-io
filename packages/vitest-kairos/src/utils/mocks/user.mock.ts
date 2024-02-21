import { faker } from '@faker-js/faker'
import { IUserDto } from '@olympus/domain-ceos'
import { pick } from '../pick'
type INewsKeys = keyof IUserDto
let id = 1
export const UserMock = (
  override = {} as Partial<IUserDto>,
  pickKeys: INewsKeys[] = [],
): IUserDto => {
  const response = {
    id: id++,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    address: faker.location.street(),
    birthdate: faker.date.past(),
    password: faker.internet.password(),
    createdAt: faker.date.recent(),
    ...override,
  }
  if (pickKeys.length > 0) {
    return pick<IUserDto>(pickKeys, response) as IUserDto
  }
  return response
}
export const UserMockList = (length = 10, pickKeys: INewsKeys[] = []) => {
  return Array.from({ length }, () => UserMock({}, pickKeys))
}
