export const PaginationMock = <T>(data: T[], page = 1) => {
  const perPage = 12
  const total = data.length
  const pages = Math.ceil(total / perPage)
  return { page: page, take: perPage, skip: page, pages, total, data }
}
export type IPaginationMock<T> = ReturnType<typeof PaginationMock<T>>
