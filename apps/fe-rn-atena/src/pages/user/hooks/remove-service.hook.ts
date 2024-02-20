import { useRemoveUser } from '@olympus/gateway-eros'
import { useCallback } from 'react'

export const useRemoveService = () => {
  const removeUserService = useRemoveUser<number>()
  const handleDelete = useCallback(
    async (id: string | number) => {
      await removeUserService.mutateAsync(+id)
    },
    [removeUserService],
  )

  return { handleDelete }
}
