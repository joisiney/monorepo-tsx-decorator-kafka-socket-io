import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { useAllNews } from '@olympus/gateway-eros'
import { IPagination } from '@olympus/lib-hera'
import { useCallback, useRef } from 'react'

export const useFindAllService = () => {
  const isLastPageRef = useRef<any | undefined>()
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
  } = useAllNews<IPagination.Hydrate<any>, IPagination.Hydrate<AppNewsEntity>>({
    transformData: (result) => {
      isLastPageRef.current = result.page >= result.pages

      result.data = result.data.map((item) => new AppNewsEntity(item))
      return result
    },
    select: ({
      pages,
    }: {
      pageParams: number
      pages: IPagination.Hydrate<AppNewsEntity>[]
    }) => pages.map((item) => item.data).flat(),
  })
  const isLoading = isFetchingNextPage || isFetchingPreviousPage

  const handleInfiniteScroll = useCallback(() => {
    if (!isLoading && hasNextPage && !isLastPageRef.current) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isLoading])

  return { data, isLoading, handleInfiniteScroll }
}