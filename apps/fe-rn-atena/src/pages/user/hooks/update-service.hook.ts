import { AppUserEntity } from '@/@core/domain/entities/user.entity'
import { IUserDto } from '@olympus/domain-ceos'
import { useUpdateUser } from '@olympus/gateway-eros'
import { IOptional } from '@olympus/lib-hera'
import { useCallback } from 'react'

export const useUpdateService = () => {
  const updateUserService =
    useUpdateUser<IOptional<IUserDto, 'createdAt' | 'password'>>()
  const handleUpdateTitle = useCallback(
    (dataUpdated: AppUserEntity) => {
      return async (title: string, id: string | number) => {
        const entity = new AppUserEntity({
          ...dataUpdated.db,
          name: title,
          id: +id,
        })
        await updateUserService.mutateAsync(entity.toUpdate())
      }
    },
    [updateUserService],
  )

  return { handleUpdateTitle }
}
