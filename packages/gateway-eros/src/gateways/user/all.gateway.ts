import { useInfiniteQuery } from '@tanstack/react-query'
import { clientHttp } from '../../contexts/react-query'

const queryFn = async <Input, Output>({ page }: { page: number }) => {
  const response = await clientHttp.get<Output>('/olympus/user', {
    headers: {
      'x-page': page,
    },
  })
  return response
}

export const useAllUser = <Input, Output>({
  select,
}: {
  select: (props: any) => any
}) => {
  const response = useInfiniteQuery({
    queryKey: ['/olympus/user'],
    initialPageParam: 1,
    select: (data) => select(data),
    queryFn: ({ pageParam = 1 }) => queryFn<Input, Output>({ page: pageParam }),
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
