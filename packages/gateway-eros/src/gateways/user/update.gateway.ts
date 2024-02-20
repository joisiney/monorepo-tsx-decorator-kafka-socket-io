import { useMutation } from '@tanstack/react-query'
import { clientHttp } from '../../contexts/react-query'

const mutationFn = async <T extends { id: string | number }>({
  id,
  ...body
}: T) => {
  await clientHttp.put<T>(`/olympus/user/${id}`, body)
  return true
}
export const useUpdateUser = <T extends { id: string | number }>() => {
  return useMutation({
    mutationFn: (props: T) => {
      return mutationFn<T>(props)
    },
  })
}
