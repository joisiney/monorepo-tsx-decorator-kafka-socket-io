import { faker } from '@faker-js/faker'
import { INewsDto } from '@olympus/domain-ceos'
import { pick } from '../pick'
type INewsKeys = keyof INewsDto
export const NewsMock = (
  override = {} as Partial<INewsDto>,
  pickKeys: INewsKeys[] = [],
): INewsDto => {
  const response = {
    id: crypto.randomUUID(),
    title: faker.lorem.words(3),
    description: faker.lorem.words(10),
    content: faker.lorem.words(100),
    createdAt: faker.date.recent(),
    thumbnail: faker.image.url(),
    ...override,
  }
  if (pickKeys.length > 0) {
    return pick<INewsDto>(pickKeys, response) as INewsDto
  }
  return response
}
export const NewsMockList = (length = 10, pickKeys: INewsKeys[] = []) => {
  return Array.from({ length }, () => NewsMock({}, pickKeys))
}
