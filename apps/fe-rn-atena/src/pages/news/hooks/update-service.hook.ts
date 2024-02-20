import { AppNewsEntity } from '@/@core/domain/entities/news.entity'
import { Socket } from '@/utils/socket'
import { INewsDto } from '@olympus/domain-ceos'
import { queryClient, useUpdateNews } from '@olympus/gateway-eros'
import { IOptional } from '@olympus/lib-hera'
import { useCallback, useEffect } from 'react'
import { IPageNews } from '../index.dto'

export const useUpdateService = () => {
  const updateNewsService = useUpdateNews<IOptional<INewsDto, 'createdAt'>>()
  const handleUpdateTitle = useCallback(
    (dataUpdated: AppNewsEntity) => {
      return async (title: string, id: string | number) => {
        const entity = new AppNewsEntity({
          ...dataUpdated.db,
          title,
          id: `${id}`,
        })
        await updateNewsService.mutateAsync(entity.toUpdate())
      }
    },
    [updateNewsService],
  )

  useEffect(() => {
    const socketInstance = Socket.getInstance()
    socketInstance.on('news-update', (response: INewsDto) => {
      queryClient.setQueryData(
        ['/olympus/news'],
        ({ pageParams, pages }: IPageNews.QueryParams) => {
          const clone = pages.map((page) => {
            const clonePage = { ...page, data: [...page.data] }
            const index = clonePage.data.findIndex(
              (item: any) => item.id === response.id,
            )
            if (index !== -1) {
              clonePage.data.splice(index, 1, response)
            }
            return clonePage
          })

          return {
            pages: clone,
            pageParams: [...pageParams],
          }
        },
      )
    })
    return () => {
      socketInstance.off('news-update')
    }
  }, [])

  return { handleUpdateTitle }
}
