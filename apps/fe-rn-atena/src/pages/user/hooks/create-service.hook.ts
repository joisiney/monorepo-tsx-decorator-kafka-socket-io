import { AppUserEntity } from '@/@core/domain/entities/user.entity'

import { useCreateUser } from '@olympus/gateway-eros'
import { useCallback } from 'react'

export const useCreateService = () => {
  const createUserService = useCreateUser()
  const handleAdd = useCallback(
    async (userTaskName: string) => {
      const newTask = new AppUserEntity({
        name: userTaskName,
        email: `${userTaskName.toLowerCase().replace(/[a-z0-9/.]/gi, '')}@johndoe.com.br`,
        address: null,
        birthdate: null,
        password: 'johndoe1234',
      })
      createUserService.mutate(newTask.toCreate())
    },
    [createUserService],
  )

  return { handleAdd }
}
