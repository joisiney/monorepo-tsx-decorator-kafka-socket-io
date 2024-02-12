import { useMutation } from '@tanstack/react-query'
import { clientHttp } from '../../services/client-http'
const mutationFn = async <Input>(body: Input) => {
  await clientHttp.post<Input>('/olympus/news', body)
  return true
}
export const useCreateNews = <T>() => {
  return useMutation({
    mutationFn: (props: T) => {
      return mutationFn<T>(props)
    },
  })
}
