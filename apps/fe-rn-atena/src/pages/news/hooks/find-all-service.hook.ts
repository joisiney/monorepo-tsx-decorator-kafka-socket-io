import { INewsDto, IPagination } from '@olympus/domain-ceos'
import { useAllNews } from '@olympus/gateway-eros'
import { useCallback, useRef } from 'react'
import { AppNewsEntity } from '../../../@core/domain/entities/news.entity'
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
  } = useAllNews<
    IPagination.Hydrate<INewsDto>,
    IPagination.Hydrate<AppNewsEntity>
  >({
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
    const isNotLoading = !isLoading
    const hasMorePages = hasNextPage && !isLastPageRef.current
    if (isNotLoading && hasMorePages) {
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
