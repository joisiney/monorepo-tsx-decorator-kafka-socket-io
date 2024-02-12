import { useInfiniteQuery } from '@tanstack/react-query'
import { clientHttp } from '../../services/client-http'

const queryFn = async <Input, Output>({
  transformData,
  page,
}: {
  transformData: (props: Input) => Output
  page: number
}) => {
  const response = await clientHttp.get<Input>('/olympus/news', {
    headers: {
      'x-page': page,
    },
  })
  return transformData(response)
}

export const useAllNews = <Input, Output>({
  transformData,
  select,
}: {
  transformData: (props: Input) => Output
  select: (props: any) => any
}) => {
  return useInfiniteQuery({
    queryKey: ['/olympus/news'],
    initialPageParam: 1,
    select: (data) => {
      return select(data)
    },
    queryFn: ({ pageParam = 1 }) => queryFn({ transformData, page: pageParam }),
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage as { page: number; pages: number }
      const nextPage = Math.min(page + 1, pages)
      return nextPage
    },
    getPreviousPageParam: (firstPage) => {
      const { page, pages } = firstPage as { page: number; pages: number }
      const previusPage = Math.max(page - 1, 0)
      return previusPage
    },
  })
}
