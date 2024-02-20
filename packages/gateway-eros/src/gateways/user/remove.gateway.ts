import { useMutation } from '@tanstack/react-query'
import { clientHttp } from '../../contexts/react-query'
const mutationFn = async <T>(id: T) => {
  await clientHttp.delete<T>(`/olympus/user/${id}`)
  return true
}
export const useRemoveUser = <T>() => {
  return useMutation({
    mutationFn: (id: T) => {
      return mutationFn<T>(id)
    },
  })
}
