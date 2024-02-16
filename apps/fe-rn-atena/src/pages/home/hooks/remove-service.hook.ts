import { Socket } from '@/utils/socket'
import { INewsDto } from '@olympus/domain-ceos'
import { queryClient, useRemoveNews } from '@olympus/gateway-eros'
import { useCallback, useEffect } from 'react'

export const useRemoveService = () => {
  const removeNewsService = useRemoveNews<string>()
  const handleDelete = useCallback(
    async (id: string) => {
      await removeNewsService.mutateAsync(id)
    },
    [removeNewsService],
  )
  useEffect(() => {
    const socketInstance = Socket.getInstance()
    socketInstance.on('news-delete', (response: Pick<INewsDto, 'id'>) => {
      queryClient.setQueryData(['/olympus/news'], ({ pageParams, pages }) => {
        const clone = pages.map((page: any) => {
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
      })
    })
    return () => {
      socketInstance.off('news-delete')
    }
  }, [])

  return { handleDelete }
}
