import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { useAllNews } from '@olympus/gateway-eros'
import { IPagination } from '@olympus/lib-hera'
import { useCallback, useRef } from 'react'
import { IPageNews } from '../index.dto'

export const useFindAllService = () => {
  const isLastPageRef = useRef<boolean | undefined>()
  const totalPagination = useRef<number | undefined>()
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
  } = useAllNews<IPagination.Hydrate<any>, IPagination.Hydrate<AppNewsEntity>>({
    select: ({ pages }: IPageNews.QueryParams) => {
      const lastedPage = pages[pages.length - 1]
      isLastPageRef.current = lastedPage.page >= lastedPage.pages
      totalPagination.current = lastedPage.total
      const response = pages
        .map((itemDataInfInfiniteQuery) =>
          itemDataInfInfiniteQuery.data.map(
            (serverEntity) => new AppNewsEntity(serverEntity),
          ),
        )
        .flat()
      return response
    },
  })
  const isLoading = isFetchingNextPage || isFetchingPreviousPage

  const handleInfiniteScroll = useCallback(() => {
    if (!isLoading && hasNextPage && !isLastPageRef.current) {
      fetchNextPage()
    }
  }, [fetchNextPage, hasNextPage, isLoading])
  return {
    data: data as AppNewsEntity[],
    total: totalPagination.current ?? 0,
    isLoading,
    handleInfiniteScroll,
  }
}
