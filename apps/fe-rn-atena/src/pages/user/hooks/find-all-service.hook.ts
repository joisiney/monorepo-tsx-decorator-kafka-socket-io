import { AppUserEntity } from '@/@core/domain/entities/user.entity'
import { useAllUser } from '@olympus/gateway-eros'
import { IPagination } from '@olympus/lib-hera'
import { useCallback, useRef } from 'react'
import { IPageUser } from '../index.dto'

export const useFindAllService = () => {
  const isLastPageRef = useRef<boolean | undefined>()
  const totalPagination = useRef<number | undefined>()
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    data,
  } = useAllUser<IPagination.Hydrate<any>, IPagination.Hydrate<AppUserEntity>>({
    select: ({ pages }: IPageUser.QueryParams) => {
      const lastedPage = pages[pages.length - 1]
      isLastPageRef.current = lastedPage.page >= lastedPage.pages
      totalPagination.current = lastedPage.total
      const response = pages
        .map((itemDataInfInfiniteQuery) =>
          itemDataInfInfiniteQuery.data.map(
            (serverEntity) => new AppUserEntity(serverEntity),
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
    data: data as AppUserEntity[],
    total: totalPagination.current ?? 0,
    isLoading,
    handleInfiniteScroll,
  }
}
