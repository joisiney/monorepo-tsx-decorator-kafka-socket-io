import { useInfiniteQuery } from '@tanstack/react-query'
import { clientHttp } from '../../contexts/react-query'

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
  return transformData(response as Input)
}

export const useAllNews = <Input, Output>({
  transformData,
  select,
}: {
  transformData: (props: Input) => Output
  select: (props: any) => any
}) => {
  const response = useInfiniteQuery({
    queryKey: ['/olympus/news'],
    initialPageParam: 1,
    select: (data) => select(data),
    queryFn: ({ pageParam = 1 }) => queryFn({ transformData, page: pageParam }),
    getNextPageParam: (lastPage = { page: 1, pages: [] }) => {
      const { page, pages } = lastPage as { page: number; pages: number }
      const nextPage = Math.min(page + 1, pages)
      return nextPage
    },
    getPreviousPageParam: (firstPage = { page: 1, pages: [] }) => {
      const { page } = firstPage as { page: number }
      const previusPage = Math.max(page - 1, 0)
      return previusPage
    },
  })
  return response
}
