import { queryClient, useRemoveUser } from '@olympus/gateway-eros'
import { useCallback } from 'react'
import { IPageUser } from '../index.dto'

export const useRemoveService = () => {
  const removeUserService = useRemoveUser<number>()
  const handleDelete = useCallback(
    async (id: string | number) => {
      await removeUserService.mutateAsync(+id)
      queryClient.setQueryData(
        ['/olympus/user'],
        ({ pageParams, pages }: IPageUser.QueryParams) => {
          const clone = pages.map((page) => {
            const clonePage = { ...page, data: [...page.data] }
            const index = clonePage.data.findIndex((item) => item.id === id)
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
    },
    [removeUserService],
  )

  return { handleDelete }
}
