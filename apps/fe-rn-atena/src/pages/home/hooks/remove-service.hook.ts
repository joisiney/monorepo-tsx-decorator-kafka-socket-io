import { queryClient, useRemoveNews } from '@olympus/gateway-eros'
import { useCallback } from 'react'

export const useRemoveService = () => {
  const removeNewsService = useRemoveNews<string>()
  const handleDelete = useCallback(
    async (id: string) => {
      await removeNewsService.mutateAsync(id)
      queryClient.setQueryData(['/olympus/news'], ({ pageParams, pages }) => {
        const clone = pages.map((page: any) => {
          const clonePage = { ...page, data: [...page.data] }
          const index = clonePage.data.findIndex((item: any) => item.id === id)
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
    },
    [removeNewsService],
  )

  return { handleDelete }
}
