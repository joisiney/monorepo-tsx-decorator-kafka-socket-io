import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { INewsDto } from '@olympus/domain-ceos'
import { queryClient, useUpdateNews } from '@olympus/gateway-eros'
import { IOptional } from '@olympus/lib-hera'
import { useCallback } from 'react'

export const useUpdateService = () => {
  const updateNewsService = useUpdateNews<IOptional<INewsDto, 'createdAt'>>()
  const handleUpdateTitle = useCallback(
    async (dataUpdated: AppNewsEntity) => {
      await updateNewsService.mutateAsync(dataUpdated.toUpdate())
      queryClient.setQueryData(['/olympus/news'], ({ pageParams, pages }) => {
        const clone = pages.map((page: any) => {
          const clonePage = { ...page, data: [...page.data] }
          const index = clonePage.data.findIndex(
            (item: any) => item.id === dataUpdated.id,
          )
          if (index !== -1) {
            clonePage.data.splice(index, 1, dataUpdated)
          }
          return clonePage
        })
        return {
          pages: clone,
          pageParams: [...pageParams],
        }
      })
    },
    [updateNewsService],
  )

  return { handleUpdateTitle }
}
