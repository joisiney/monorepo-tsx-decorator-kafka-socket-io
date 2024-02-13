import { faker } from '@faker-js/faker'
import { INewsDto } from '@olympus/domain-ceos'
export const NewsMock = (override = {} as Partial<INewsDto>): INewsDto => {
  return {
    id: crypto.randomUUID(),
    title: faker.lorem.words(3),
    description: faker.lorem.words(10),
    content: faker.lorem.words(100),
    createdAt: faker.date.recent(),
    thumbnail: faker.image.url(),
    ...override,
  }
}
export const NewsMockList = (length = 10) => {
  return Array.from({ length }, () => NewsMock())
}
