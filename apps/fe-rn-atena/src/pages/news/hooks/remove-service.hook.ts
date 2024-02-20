import { Socket } from '@/utils/socket'
import { INewsDto } from '@olympus/domain-ceos'
import { queryClient, useRemoveNews } from '@olympus/gateway-eros'
import { useCallback, useEffect } from 'react'
import { IPageNews } from '../index.dto'

export const useRemoveService = () => {
  const removeNewsService = useRemoveNews<string>()
  const handleDelete = useCallback(
    async (id: string | number) => {
      await removeNewsService.mutateAsync(`${id}`)
    },
    [removeNewsService],
  )
  useEffect(() => {
    const socketInstance = Socket.getInstance()
    socketInstance.on('news-delete', (response: Pick<INewsDto, 'id'>) => {
      queryClient.setQueryData(
        ['/olympus/news'],
        ({ pageParams, pages }: IPageNews.QueryParams) => {
          const clone = pages.map((page) => {
            const clonePage = { ...page, data: [...page.data] }
            const index = clonePage.data.findIndex(
              (item: any) => item.id === response.id,
            )
            if (index !== -1) {
              clonePage.data.splice(index, 1)
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
      socketInstance.off('news-delete')
    }
  }, [])

  return { handleDelete }
}
